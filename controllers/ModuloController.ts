import { Context, RouterContext, z } from "../dependencies/dependencias.ts";
import { ModuloModel } from "../models/ModuloModel.ts";

const identificadorSchema = z.string().uuid("El identificador debe ser un UUID válido.");
const nivelSchema = z.enum(["basico", "intermedio", "avanzado"], {
  errorMap: () => ({ message: "Nivel inválido. Use: basico, intermedio o avanzado." }),
});


// GET /api/modulos — Listar todos los módulos
export const getModulos = async (ctx: Context) => {
  const { response } = ctx;
  try {
    const model = new ModuloModel();
    const modulos = await model.ListarModulos();

    if (!modulos || modulos.length === 0) {
      response.status = 404;
      response.body = { success: false, message: "No se encontraron módulos." };
      return;
    }

    // Mapear a formato que espera el frontend Android
    const data = modulos.map((m) => ({
      id: m.idModulo,
      titulo: m.titulo,
      descripcion: m.descripcion,
      orden: m.orden,
    }));

    response.status = 200;
    response.body = { success: true, data };
  } catch (error) {
    console.error(error);
    response.status = 500;
    response.body = { success: false, message: "Error interno del servidor." };
  }
};

// GET /api/modulos/:identificador — Detalle de un módulo
export const getModuloPorIdentificador = async (
  ctx: RouterContext<"/api/modulos/:identificador">
) => {
  const { response, params } = ctx;
  try {
    const identificador = identificadorSchema.parse(params.identificador);
    const model = new ModuloModel();
    const modulo = await model.ObtenerPorIdentificador(identificador);

    if (!modulo) {
      response.status = 404;
      response.body = { success: false, message: "Módulo no encontrado." };
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: {
        id: modulo.idModulo,
        titulo: modulo.titulo,
        descripcion: modulo.descripcion,
        orden: modulo.orden,
      },
    };
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

// GET /api/modulos/:identificador/seleccionador/:nivel
export const getSeccionPorNivel = async (
  ctx: RouterContext<"/api/modulos/:identificador/seleccionador/:nivel">
) => {
  const { response, params } = ctx;
  try {
    const identificador = identificadorSchema.parse(params.identificador);
    const nivel = nivelSchema.parse(params.nivel);

    const model = new ModuloModel();
    const modulo = await model.ObtenerPorIdentificador(identificador);
    if (!modulo) {
      response.status = 404;
      response.body = { success: false, message: "Módulo no encontrado." };
      return;
    }

    const seccion = await model.ObtenerSeccionPorNivel(modulo.idModulo, nivel);
    if (!seccion) {
      response.status = 404;
      response.body = { success: false, message: `Nivel '${nivel}' no encontrado para este módulo.` };
      return;
    }

    // Mapear a formato del frontend
    response.status = 200;
    response.body = {
      success: true,
      data: {
        id: seccion.idSeccion,
        modulo_id: seccion.moduloId,
        nivel: seccion.nivel,
        titulo: seccion.titulo,
        descripcion: seccion.descripcion,
        orden: seccion.orden,
        actividades: (seccion.actividades || []).map((a) => ({
          id: a.idActividad,
          seccion_id: a.seccionId,
          tipo: a.tipo,
          titulo: a.titulo,
          texto_cuerpo: a.textoCuerpo,
          url_video: a.urlVideo,
          orden: a.orden,
        })),
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status = 400;
      response.body = { success: false, message: "Datos inválidos.", errors: error.format() };
    } else {
      console.error("Error en getSeccionPorNivel:", error);
      response.status = 500;
      response.body = { success: false, message: "Error interno del servidor." };
    }
  }
};
