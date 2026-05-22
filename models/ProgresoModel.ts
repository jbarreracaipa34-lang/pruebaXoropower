import { sql } from "./Conexion.ts";

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

  public async ListarProgreso(idUsuario: string): Promise<ProgresoData[]> {
    try {
      const result = await sql`
        SELECT *
        FROM progreso_usuario
        WHERE id_usuario = ${idUsuario}
        ORDER BY timestamp_ultimo_intento DESC NULLS LAST
      `;
      return result as unknown as ProgresoData[];
    } catch (error) {
      console.error("Error al listar progreso:", error);
      throw new Error("No se pudo obtener el progreso.");
    }
  }

  // Obtiene el resumen estadístico del usuario.
  public async ObtenerResumen(idUsuario: string): Promise<ProgresoResumen> {
    try {
      const [stats] = await sql`
        SELECT
          COUNT(*) FILTER (WHERE completado = true)  AS completadas,
          COUNT(*) FILTER (WHERE completado = false) AS en_progreso,
          COUNT(*)                                    AS total
        FROM progreso_usuario
        WHERE id_usuario = ${idUsuario}
      `;
      return {
        completadas: Number(stats.completadas || 0),
        enProgreso: Number(stats.en_progreso || 0),
        total: Number(stats.total || 0)
      };
    } catch (error) {
      console.error("Error al obtener resumen:", error);
      throw new Error("No se pudo obtener el resumen de progreso.");
    }
  }

  // Inserta o actualiza el progreso de un ejercicio.
  public async ActualizarProgreso(
    idUsuario: string,
    idEjercicio: string,
    puntuacion: number
  ): Promise<{ success: boolean; message: string; progreso?: Record<string, unknown> }> {
    try {
      const completado = puntuacion >= 70; // Aprobado con 70%

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
