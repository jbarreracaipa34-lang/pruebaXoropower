import { Context, RouterContext } from "../dependencies/dependencias.ts";
import { RitmoModel } from "../models/RitmoModel.ts";

const model = new RitmoModel();

// GET /api/ejercicios-ritmo — Listar ejercicios
export const getEjerciciosRitmo = async (ctx: Context) => {
  const { response } = ctx;
  try {
    const ejercicios = await model.ListarEjercicios();
    response.status = 200;
    response.body = { success: true, data: ejercicios };
  } catch (error) {
    response.status = 500;
    response.body = { success: false, message: "Error al obtener ejercicios de ritmo." };
  }
};

// GET /api/ejercicios-ritmo/:id — Detalle del ejercicio
export const getEjercicioRitmoDetalle = async (
  ctx: RouterContext<"/api/ejercicios-ritmo/:id">
) => {
  const { response, params } = ctx;
  try {
    const id = params.id;
    const ejercicio = await model.ObtenerPorId(id);

    if (!ejercicio) {
      response.status = 404;
      response.body = { success: false, message: "Ejercicio no encontrado." };
      return;
    }

    if (ejercicio && typeof ejercicio.secuenciaNotas === "string") {
      try {
        ejercicio.secuenciaNotas = JSON.parse(ejercicio.secuenciaNotas);
      } catch (e) {
        console.error("Error parseando secuenciaNotas:", e);
      }
    }

    response.status = 200;
    response.body = { success: true, data: ejercicio };
  } catch (error) {
    response.status = 500;
    response.body = { success: false, message: "Error al obtener el detalle del ejercicio." };
  }
};
