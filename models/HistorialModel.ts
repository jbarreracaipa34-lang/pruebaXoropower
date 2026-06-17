import { sql } from "./Conexion.ts";

export interface IntentoData {
  id?: string;
  idUsuario: string;
  idEjercicio: string;
  precisionPorcentaje: number;
  aciertos: number;
  fallos: number;
  perdidos: number;
  fecha?: string;
}

export interface PuntoHistorial {
  fecha: string;
  precisionPromedio: number;
  totalEjercicios: number;
}

export class HistorialModel {
  /**
   * Registra un nuevo intento con métricas detalladas.
   */
  public static async RegistrarIntento(
    idUsuario: string,
    idEjercicio: string,
    precision: number,
    aciertos: number,
    fallos: number,
    perdidos: number
  ): Promise<IntentoData> {
    try {
      const [intento] = await sql`
        INSERT INTO historial_precision 
          (id_usuario, id_ejercicio, precision_porcentaje, aciertos, fallos, perdidos)
        VALUES 
          (${idUsuario}, ${idEjercicio}, ${precision}, ${aciertos}, ${fallos}, ${perdidos})
        RETURNING 
          id,
          id_usuario as "idUsuario",
          id_ejercicio as "idEjercicio",
          precision_porcentaje as "precisionPorcentaje",
          aciertos,
          fallos,
          perdidos,
          fecha
      `;
      return intento as unknown as IntentoData;
    } catch (error) {
      console.error("Error al registrar intento:", error);
      throw new Error("No se pudo registrar el intento.");
    }
  }

  /**
   * Obtiene el historial semanal agrupado por día (últimos 7 días).
   * Retorna la precisión promedio y total de ejercicios por día.
   */
  public static async ObtenerHistorialSemanal(idUsuario: string): Promise<PuntoHistorial[]> {
    try {
      const resultado = await sql`
        SELECT 
          DATE(fecha) as fecha,
          ROUND(AVG(precision_porcentaje)::numeric, 1) as "precisionPromedio",
          COUNT(*) as "totalEjercicios"
        FROM historial_precision
        WHERE id_usuario = ${idUsuario}
          AND fecha >= NOW() - INTERVAL '7 days'
        GROUP BY DATE(fecha)
        ORDER BY DATE(fecha) ASC
      `;
      return resultado as unknown as PuntoHistorial[];
    } catch (error) {
      console.error("Error al obtener historial semanal:", error);
      throw new Error("No se pudo obtener el historial semanal.");
    }
  }

  /**
   * Obtiene el historial detallado de intentos de un ejercicio específico.
   */
  public static async ObtenerHistorialEjercicio(
    idUsuario: string,
    idEjercicio: string
  ): Promise<IntentoData[]> {
    try {
      const resultado = await sql`
        SELECT 
          id,
          id_ejercicio as "idEjercicio",
          precision_porcentaje as "precisionPorcentaje",
          aciertos,
          fallos,
          perdidos,
          fecha
        FROM historial_precision
        WHERE id_usuario = ${idUsuario}
          AND id_ejercicio = ${idEjercicio}
        ORDER BY fecha DESC
        LIMIT 20
      `;
      return resultado as unknown as IntentoData[];
    } catch (error) {
      console.error("Error al obtener historial de ejercicio:", error);
      throw new Error("No se pudo obtener el historial del ejercicio.");
    }
  }
}
