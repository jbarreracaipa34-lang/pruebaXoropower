import { sql } from "./Conexion.ts";

export interface RachaData {
  id?: string;
  idUsuario: string;
  rachaActual: number;
  rachaMaxima: number;
  ultimaFecha: string | null;
}

export class RachaModel {
  /**
   * Registra actividad para un usuario. Incrementa la racha si el último
   * acceso fue ayer, la reinicia si fue hace más de un día, o no hace cambios si ya practicó hoy.
   */
  public static async RegistrarActividad(idUsuario: string): Promise<RachaData> {
    try {
      const [racha] = await sql`
        INSERT INTO rachas_usuario (id_usuario, racha_actual, racha_maxima, ultima_fecha)
        VALUES (${idUsuario}, 1, 1, CURRENT_DATE)
        ON CONFLICT (id_usuario)
        DO UPDATE SET
          racha_actual = CASE
            WHEN rachas_usuario.ultima_fecha = CURRENT_DATE THEN rachas_usuario.racha_actual
            WHEN rachas_usuario.ultima_fecha = CURRENT_DATE - INTERVAL '1 day' THEN rachas_usuario.racha_actual + 1
            ELSE 1
          END,
          racha_maxima = CASE
            WHEN rachas_usuario.ultima_fecha = CURRENT_DATE THEN rachas_usuario.racha_maxima
            WHEN rachas_usuario.ultima_fecha = CURRENT_DATE - INTERVAL '1 day' THEN GREATEST(rachas_usuario.racha_maxima, rachas_usuario.racha_actual + 1)
            ELSE GREATEST(rachas_usuario.racha_maxima, 1)
          END,
          ultima_fecha = CURRENT_DATE
        RETURNING racha_actual as "rachaActual", racha_maxima as "rachaMaxima", ultima_fecha as "ultimaFecha"
      `;
      return racha as unknown as RachaData;
    } catch (error) {
      console.error("Error al registrar actividad (racha):", error);
      throw new Error("No se pudo registrar la actividad.");
    }
  }

  /**
   * Obtiene la racha actual y máxima de un usuario.
   */
  public static async ObtenerRacha(idUsuario: string): Promise<RachaData> {
    try {
      const [racha] = await sql`
        SELECT 
          racha_actual as "rachaActual", 
          racha_maxima as "rachaMaxima", 
          ultima_fecha as "ultimaFecha"
        FROM rachas_usuario
        WHERE id_usuario = ${idUsuario}
      `;
      if (!racha) {
        return {
          idUsuario,
          rachaActual: 0,
          rachaMaxima: 0,
          ultimaFecha: null,
        };
      }
      return racha as unknown as RachaData;
    } catch (error) {
      console.error("Error al obtener racha:", error);
      throw new Error("No se pudo obtener la racha del usuario.");
    }
  }
}
