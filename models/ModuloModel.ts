import { sql } from "./Conexion.ts";

export interface ModuloData {
  idModulo:    string;
  identificador: string;
  titulo:      string;
  descripcion: string | null;
  orden:       number;
}

export interface SeccionData {
  idSeccion:   string;
  moduloId:    string;
  nivel:       string;
  titulo:      string;
  descripcion: string | null;
  orden:       number;
}

export interface ActividadData {
  idActividad:  string;
  seccionId:    string;
  tipo:         string;
  titulo:       string;
  textoCuerpo:  string | null;
  urlVideo:     string | null; // Reservado para uso futuro (admin panel)
  orden:        number;
}

export class ModuloModel {
  private static cacheModulos: ModuloData[] | null = null;
  private static ultimaActualizacion: number = 0;
  private static REFRESCO_MS = 5 * 60 * 1000; // 5 minutos

  constructor() {
    // Iniciamos el ciclo de refresco si es la primera vez
    if (ModuloModel.ultimaActualizacion === 0) {
      this.RefrescarCachePeriodicamente();
    }
  }

  private async RefrescarCachePeriodicamente() {
    try {
      await this.SincronizarCache();
    } catch (e) {
      console.error("Error en sincronización inicial:", e);
    }
    
    const timer = setInterval(async () => {
      try {
        await this.SincronizarCache();
        console.log("✅ Cache de módulos actualizado.");
      } catch (e) {
        console.error("❌ Error al refrescar cache de módulos:", e);
      }
    }, ModuloModel.REFRESCO_MS);

    // Evita que el temporizador mantenga activo el bucle de eventos (event loop) en Deno en los tests
    if (typeof (timer as any).unref === "function") {
      (timer as any).unref();
    } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
      Deno.unrefTimer(timer as any);
    }
  }

  public async SincronizarCache() {
    const result = await sql`
      SELECT id_modulo, titulo, descripcion, orden
      FROM modulos
      ORDER BY orden ASC
    `;
    ModuloModel.cacheModulos = result as unknown as ModuloData[];
    ModuloModel.ultimaActualizacion = Date.now();
  }

  // Lista todos los módulos (usando cache si está disponible)
  public async ListarModulos(): Promise<ModuloData[]> {
    if (ModuloModel.cacheModulos) {
      return ModuloModel.cacheModulos;
    }

    try {
      await this.SincronizarCache();
      return ModuloModel.cacheModulos || [];
    } catch (error) {
      console.error("Error al listar módulos:", error);
      throw new Error("No se pudieron obtener los módulos.");
    }
  }

  public async ObtenerPorIdentificador(id: string): Promise<ModuloData | null> {
    try {
      const [modulo] = await sql`SELECT id_modulo, titulo, descripcion, orden FROM modulos WHERE id_modulo = ${id}`;
      return (modulo as unknown as ModuloData) ?? null;
    } catch (error) {
      console.error("Error al obtener módulo:", error);
      throw new Error("No se pudo obtener el módulo.");
    }
  }

  // Obtiene una sección por módulo e identificador de nivel.
  public async ObtenerSeccionPorNivel(moduloId: string, nivel: string): Promise<(SeccionData & { actividades: ActividadData[] }) | null> {
    try {
      const [seccion] = await sql`
        SELECT id_seccion, modulo_id, nivel, titulo, descripcion, orden
        FROM secciones
        WHERE modulo_id = ${moduloId} AND nivel = ${nivel}
      `;

      const dataSeccion = seccion as unknown as SeccionData;
      if (!dataSeccion) return null;

      const actividades = await sql`
        SELECT id_actividad, seccion_id, tipo, titulo, texto_cuerpo, url_video, orden
        FROM actividades
        WHERE seccion_id = ${dataSeccion.idSeccion}
        ORDER BY orden ASC
      `;

      return { ...dataSeccion, actividades } as unknown as SeccionData & { actividades: ActividadData[] };
    } catch (error) {
      console.error("Error al obtener sección:", error);
      throw new Error("No se pudo obtener la sección.");
    }
  }
}
