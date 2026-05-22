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
}

export class RitmoModel {
  // Listar todos los ejercicios de ritmo
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

  // Obtener un ejercicio por su ID con su secuencia
  async ObtenerPorId(id: string): Promise<EjercicioRitmo | null> {
    try {
      const [result] = await sql`
        SELECT id, titulo, descripcion, nivel, tempo_bpm as "tempoBpm", secuencia_notas as "secuenciaNotas"
        FROM ejercicios_ritmo
        WHERE id = ${id}
      `;
      return result as unknown as EjercicioRitmo;
    } catch (error) {
      console.error("Error en ObtenerPorId:", error);
      throw error;
    }
  }
}
