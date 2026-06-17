import { Context, RouterContext } from "../dependencies/dependencias.ts";
import { RachaModel } from "../models/RachaModel.ts";
import { HistorialModel } from "../models/HistorialModel.ts";

export const getRacha = async (ctx: Context) => {
  const { response } = ctx;
  try {
    const idUsuario = (ctx as any).state.user?.sub;
    if (!idUsuario) {
      response.status = 401;
      response.body = { success: false, message: "Usuario no autenticado." };
      return;
    }

    const racha = await RachaModel.ObtenerRacha(idUsuario);
    response.status = 200;
    response.body = { success: true, data: racha };
  } catch (error) {
    console.error("Error en getRacha:", error);
    response.status = 500;
    response.body = { success: false, message: "Error interno del servidor." };
  }
};

export const getHistorialSemanal = async (ctx: Context) => {
  const { response } = ctx;
  try {
    const idUsuario = (ctx as any).state.user?.sub;
    if (!idUsuario) {
      response.status = 401;
      response.body = { success: false, message: "Usuario no autenticado." };
      return;
    }

    const historial = await HistorialModel.ObtenerHistorialSemanal(idUsuario);
    response.status = 200;
    response.body = { success: true, data: historial };
  } catch (error) {
    console.error("Error en getHistorialSemanal:", error);
    response.status = 500;
    response.body = { success: false, message: "Error interno del servidor." };
  }
};

export const getHistorialEjercicio = async (
  ctx: RouterContext<"/api/historial/:idEjercicio">
) => {
  const { response, params } = ctx;
  try {
    const idUsuario = (ctx as any).state.user?.sub;
    if (!idUsuario) {
      response.status = 401;
      response.body = { success: false, message: "Usuario no autenticado." };
      return;
    }

    const idEjercicio = params.idEjercicio;
    if (!idEjercicio) {
      response.status = 400;
      response.body = { success: false, message: "Falta el identificador del ejercicio." };
      return;
    }

    const intentos = await HistorialModel.ObtenerHistorialEjercicio(idUsuario, idEjercicio);
    response.status = 200;
    response.body = { success: true, data: intentos };
  } catch (error) {
    console.error("Error en getHistorialEjercicio:", error);
    response.status = 500;
    response.body = { success: false, message: "Error interno del servidor." };
  }
};
