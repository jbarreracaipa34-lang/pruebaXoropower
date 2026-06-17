import { sql } from "./Conexion.ts";

export interface NotaRitmo {
  ms: number;
  mano: "izquierda" | "derecha";
  color: "azul" | "rojo";
  texto?: string;
}

export interface EjercicioRitmo {
  id: string;
  titulo: string;
  descripcion: string;
  nivel: string;
  tempoBpm: number;
  secuenciaNotas: NotaRitmo[];
  videoUrl?: string | null;
  pasoAPaso?: string | null;
}

export class RitmoModel {
  // Obtiene el listado de todos los ejercicios de ritmo disponibles en la base de datos.
  async ListarEjercicios(): Promise<Partial<EjercicioRitmo>[]> {
    try {
      const result = await sql`
        SELECT id, titulo, descripcion, nivel, tempo_bpm as "tempoBpm"
        FROM ejercicios_ritmo
        ORDER BY fecha_creacion ASC
      `;
      return result as unknown as Partial<EjercicioRitmo>[];
    } catch (error) {
      console.error("Error en ListarEjercicios:", error);
      throw error;
    }
  }

  // Recupera la información detallada de un ejercicio de ritmo específico utilizando su identificador único.
  async ObtenerPorId(id: string): Promise<EjercicioRitmo | null> {
    try {
      const [result] = await sql`
        SELECT id, titulo, descripcion, nivel, tempo_bpm as "tempoBpm",
               secuencia_notas as "secuenciaNotas",
               video_url as "videoUrl", paso_a_paso as "pasoAPaso"
        FROM ejercicios_ritmo
        WHERE id = ${id}
      `;
      return result as unknown as EjercicioRitmo;
    } catch (error) {
      console.error("Error en ObtenerPorId:", error);
      throw error;
    }
  }

  // Inserta un nuevo ejercicio de ritmo en la base de datos. Solo accesible para administradores.
  async CrearEjercicio(data: {
    titulo: string;
    descripcion: string;
    nivel: string;
    tempoBpm: number;
    secuenciaNotas: NotaRitmo[];
    videoUrl?: string;
    pasoAPaso?: string;
  }): Promise<EjercicioRitmo> {
    try {
      const notasJson = JSON.stringify(data.secuenciaNotas);
      const [result] = await sql`
        INSERT INTO ejercicios_ritmo (titulo, descripcion, nivel, tempo_bpm, secuencia_notas, video_url, paso_a_paso)
        VALUES (${data.titulo}, ${data.descripcion}, ${data.nivel}, ${data.tempoBpm}, ${notasJson}::jsonb, ${data.videoUrl ?? null}, ${data.pasoAPaso ?? null})
        RETURNING id, titulo, descripcion, nivel, tempo_bpm as "tempoBpm",
                  secuencia_notas as "secuenciaNotas",
                  video_url as "videoUrl", paso_a_paso as "pasoAPaso"
      `;
      return result as unknown as EjercicioRitmo;
    } catch (error) {
      console.error("Error en CrearEjercicio:", error);
      throw error;
    }
  }
}

