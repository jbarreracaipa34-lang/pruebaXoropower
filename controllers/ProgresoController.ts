import { Context, z } from "../dependencies/dependencias.ts";
import { ProgresoModel } from "../models/ProgresoModel.ts";

const actualizarProgresoSchema = z.object({
  id_ejercicio: z.string().uuid("El id_ejercicio debe ser un UUID válido."),
  puntuacion:   z.number().min(0).max(100, "La puntuación debe estar entre 0 y 100."),
});

// GET /api/progreso — Listar todo el progreso del usuario autenticado
export const getProgreso = async (ctx: Context) => {
  const { response } = ctx;
  try {
    const idUsuario = (ctx as any).state.user?.sub;
    if (!idUsuario) {
      response.status = 401;
      response.body = { success: false, message: "Usuario no autenticado." };
      return;
    }

    const model = new ProgresoModel();
    const progreso = await model.ListarProgreso(idUsuario);

    response.status = 200;
    response.body = { success: true, data: progreso };
  } catch (error) {
    console.error(error);
    response.status = 500;
    response.body = { success: false, message: "Error interno del servidor." };
  }
};

// GET /api/progreso/resumen — Resumen estadístico del usuario
export const getResumen = async (ctx: Context) => {
  const { response } = ctx;
  try {
    const idUsuario = (ctx as any).state.user?.sub;
    if (!idUsuario) {
      response.status = 401;
      response.body = { success: false, message: "Usuario no autenticado." };
      return;
    }

    const model = new ProgresoModel();
    const resumen = await model.ObtenerResumen(idUsuario);

    response.status = 200;
    response.body = { success: true, data: resumen };
  } catch (error) {
    console.error(error);
    response.status = 500;
    response.body = { success: false, message: "Error interno del servidor." };
  }
};

// POST /api/progreso — Insertar o actualizar progreso
export const postProgreso = async (ctx: Context) => {
  const { response, request } = ctx;
  try {
    const idUsuario = (ctx as any).state.user?.sub;
    if (!idUsuario) {
      response.status = 401;
      response.body = { success: false, message: "Usuario no autenticado." };
      return;
    }

    const body = await request.body.json();
    const validated = actualizarProgresoSchema.parse(body);

    const model = new ProgresoModel();
    const result = await model.ActualizarProgreso(
      idUsuario,
      validated.id_ejercicio,
      validated.puntuacion
    );

    if (result.success) {
      response.status = 200;
      response.body = { success: true, message: result.message, data: result.progreso };
    } else {
      response.status = 400;
      response.body = { success: false, message: result.message };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status = 400;
      response.body = { success: false, message: "Datos inválidos.", errors: error.format() };
    } else {
      response.status = 500;
      response.body = { success: false, message: "Error interno del servidor." };
    }
  }
};
