import { sql } from "./Conexion.ts";
import { RachaModel } from "./RachaModel.ts";

export type EstadoProgreso = "no_iniciado" | "en_progreso" | "completado";

export interface ProgresoData {
  idProgreso:    string | undefined;
  idUsuario:     string;
  idEjercicio?:  string | null;
  idLeccion?:    string | null;
  idModulo?:     string | null;
  completado:    boolean;
  puntuacionMasAlta: number | null;
  porcentajeAvance:  number;
  vecesIntentado:    number;
  timestampUltimoIntento: string | null;
  timestampCompletado:    string | null;
}

export interface ProgresoResumen {
  completadas: number;
  enProgreso:  number;
  total:       number;
}

export class ProgresoModel {
  private static cache = new Map<string, { data: ProgresoData[]; timestamp: number }>();
  private static REFRESCO_MS = 5 * 60 * 1000; // 5 minutos de cache

  private async getOrFetchProgreso(idUsuario: string): Promise<ProgresoData[]> {
    const ahora = Date.now();
    const cached = ProgresoModel.cache.get(idUsuario);

    if (cached && (ahora - cached.timestamp < ProgresoModel.REFRESCO_MS)) {
      return cached.data;
    }

    const result = await sql`
      SELECT *
      FROM progreso_usuario
      WHERE id_usuario = ${idUsuario}
      ORDER BY timestamp_ultimo_intento DESC NULLS LAST
    `;
    const data = result as unknown as ProgresoData[];
    ProgresoModel.cache.set(idUsuario, { data, timestamp: ahora });
    console.log("Cache de progreso actualizado.");
    return data;
  }

  public async ListarProgreso(idUsuario: string): Promise<ProgresoData[]> {
    try {
      return await this.getOrFetchProgreso(idUsuario);
    } catch (error) {
      console.error("Error al listar progreso:", error);
      throw new Error("No se pudo obtener el progreso.");
    }
  }

  // Recupera el resumen estadístico del progreso acumulado por el usuario.
  public async ObtenerResumen(idUsuario: string): Promise<ProgresoResumen> {
    try {
      const data = await this.getOrFetchProgreso(idUsuario);
      const completadas = data.filter(p => p.completado === true).length;
      const enProgreso = data.filter(p => p.completado === false).length;
      const total = data.length;
      return {
        completadas,
        enProgreso,
        total
      };
    } catch (error) {
      console.error("Error al obtener resumen:", error);
      throw new Error("No se pudo obtener el resumen de progreso.");
    }
  }

  // Registra o actualiza el progreso obtenido por un usuario en un ejercicio específico.
  public async ActualizarProgreso(
    idUsuario: string,
    idEjercicio: string,
    puntuacion: number
  ): Promise<{ success: boolean; message: string; progreso?: Record<string, unknown> }> {
    try {
      const completado = puntuacion >= 70; // Se considera aprobado si la puntuación alcanza o supera el 70%.

      const [progreso] = await sql`
        INSERT INTO progreso_usuario
          (id_usuario, id_ejercicio, completado, puntuacion_mas_alta, porcentaje_avance, veces_intentado, timestamp_ultimo_intento)
        VALUES
          (${idUsuario}, ${idEjercicio}, ${completado}, ${puntuacion}, ${puntuacion}, 1, NOW())
        ON CONFLICT (id_usuario, id_ejercicio)
        DO UPDATE SET
          completado            = GREATEST(progreso_usuario.completado, EXCLUDED.completado),
          puntuacion_mas_alta   = GREATEST(progreso_usuario.puntuacion_mas_alta, EXCLUDED.puntuacion_mas_alta),
          porcentaje_avance     = GREATEST(progreso_usuario.porcentaje_avance, EXCLUDED.porcentaje_avance),
          veces_intentado       = progreso_usuario.veces_intentado + 1,
          timestamp_ultimo_intento = NOW(),
          timestamp_completado  = CASE
            WHEN EXCLUDED.completado = true AND progreso_usuario.timestamp_completado IS NULL
            THEN NOW()
            ELSE progreso_usuario.timestamp_completado
          END
        RETURNING *
      `;

      // Registrar racha/actividad del usuario al actualizar el progreso
      try {
        await RachaModel.RegistrarActividad(idUsuario);
      } catch (rachaError) {
        console.error("Error al actualizar racha en progreso:", rachaError);
      }

      // Invalida el caché del usuario para asegurar que las lecturas posteriores obtengan los datos nuevos.
      ProgresoModel.cache.delete(idUsuario);

      return {
        success: true,
        message: completado ? "¡Ejercicio completado!" : "Progreso guardado.",
        progreso: progreso as Record<string, unknown>,
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
      return { success: false, message: "Error interno del servidor." };
    }
  }
}
