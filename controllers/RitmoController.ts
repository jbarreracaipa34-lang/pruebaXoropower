import { Context, RouterContext } from "../dependencies/dependencias.ts";
import { RitmoModel } from "../models/RitmoModel.ts";

const model = new RitmoModel();

// Ruta GET /api/ejercicios-ritmo: Recupera el listado completo de los ejercicios de ritmo disponibles.
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

// Ruta GET /api/ejercicios-ritmo/:id: Recupera los detalles y la secuencia de notas de un ejercicio de ritmo mediante su identificador.
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

// Ruta POST /api/ejercicios-ritmo: Permite al administrador crear un nuevo ejercicio de ritmo.
export const postCrearEjercicio = async (ctx: Context) => {
  const { response, request } = ctx;
  try {
    const body = await request.body.json();
    const { titulo, descripcion, nivel, tempoBpm, secuenciaNotas, videoUrl, videoBase64, videoExtension, pasoAPaso } = body;

    if (!titulo || !descripcion || !nivel || !tempoBpm || !secuenciaNotas) {
      response.status = 400;
      response.body = { success: false, message: "Faltan campos obligatorios: titulo, descripcion, nivel, tempoBpm, secuenciaNotas." };
      return;
    }

    const nivelesValidos = ["basico", "intermedio", "avanzado"];
    if (!nivelesValidos.includes(nivel)) {
      response.status = 400;
      response.body = { success: false, message: "Nivel inválido. Use: basico, intermedio o avanzado." };
      return;
    }

    // Procesar video: priorizar archivo local sobre URL externa
    let videoUrlFinal = videoUrl;
    if (videoBase64 && videoExtension) {
      // Generar nombre único para el video local
      const timestamp = Date.now();
      const videoFileName = `video_${timestamp}.${videoExtension}`;
      // En un sistema real, aquí se guardaría el archivo en un servidor de almacenamiento
      // Por ahora, usamos un data URI para simular el almacenamiento
      videoUrlFinal = `data:video/${videoExtension};base64,${videoBase64}`;
    }

    const ejercicio = await model.CrearEjercicio({
      titulo,
      descripcion,
      nivel,
      tempoBpm,
      secuenciaNotas,
      videoUrl: videoUrlFinal,
      pasoAPaso,
    });

    response.status = 201;
    response.body = { success: true, message: "Ejercicio creado exitosamente.", data: ejercicio };
  } catch (error) {
    console.error("Error en postCrearEjercicio:", error);
    response.status = 500;
    response.body = { success: false, message: "Error al crear el ejercicio." };
  }
};
