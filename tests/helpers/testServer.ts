/**
 * testServer.ts — Componente auxiliar para pruebas (testing)
 * Se encarga de levantar la aplicación Oak en un puerto efímero (aleatorio) y
 * retorna la dirección base (baseUrl) junto con una función de cierre (close) para la limpieza de recursos.
 *
 * Ejemplo de uso:
 *   const { baseUrl, close } = await startTestServer();
 *   // ... fetch(baseUrl + "/api/...")
 *   await close();
 */
import { Application } from "../../dependencies/dependencias.ts";
import { makeApp } from "./makeApp.ts";

export interface TestServer {
  baseUrl: string;
  close: () => Promise<void>;
}

export async function startTestServer(
  app: Application = makeApp()
): Promise<TestServer> {
  const ac = new AbortController();

  // Se reserva un puerto de red disponible en el sistema operativo.
  const tmpListener = Deno.listen({ port: 0 });
  const port = (tmpListener.addr as Deno.NetAddr).port;
  tmpListener.close();

  // Se inicia el servidor en segundo plano de manera no bloqueante (omitiendo intencionalmente el await).
  const serverDone = app
    .listen({ port, signal: ac.signal })
    .catch(() => { /* Se captura el AbortError esperado al momento del cierre. */ });

  // Se realiza una breve pausa de espera para asegurar que el servidor esté en condiciones de aceptar conexiones.
  await new Promise<void>((r) => setTimeout(r, 80));

  return {
    baseUrl: `http://localhost:${port}`,
    close: async () => {
      ac.abort();
      // Se mantiene comentado para prevenir bloqueos mutuos (deadlocks) con conexiones persistentes keep-alive de fetch.
    },
  };
}

/**
 * Función auxiliar que realiza una petición fetch de tipo JSON y retorna el estado y el cuerpo de la respuesta.
 */
export async function fetchJson(
  url: string,
  options?: RequestInit
): Promise<{ status: number; body: unknown }> {
  const res = await fetch(url, {
    headers: { 
      "Content-Type": "application/json", 
      "Connection": "close", // Se define el cierre del socket tras la respuesta para evitar el bloqueo del framework Oak.
      ...(options?.headers ?? {}) 
    },
    ...options,
  });
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { status: res.status, body };
}
