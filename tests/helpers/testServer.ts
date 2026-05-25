/**
 * testServer.ts — Helper de testing
 * Levanta la app Oak en un puerto efímero (aleatorio) y
 * devuelve la baseUrl + una función close() para limpieza.
 *
 * Uso:
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

  // Reserva un puerto libre del SO
  const tmpListener = Deno.listen({ port: 0 });
  const port = (tmpListener.addr as Deno.NetAddr).port;
  tmpListener.close();

  // Inicia el servidor en background (no await intencional)
  const serverDone = app
    .listen({ port, signal: ac.signal })
    .catch(() => { /* AbortError esperado al cerrar */ });

  // Pequeña pausa para que el servidor acepte conexiones
  await new Promise<void>((r) => setTimeout(r, 80));

  return {
    baseUrl: `http://localhost:${port}`,
    close: async () => {
      ac.abort();
      // await serverDone; // Comentado para evitar deadlocks con conexiones keep-alive de fetch
    },
  };
}

/**
 * Helper: hace un fetch JSON y devuelve { status, body }
 */
export async function fetchJson(
  url: string,
  options?: RequestInit
): Promise<{ status: number; body: unknown }> {
  const res = await fetch(url, {
    headers: { 
      "Content-Type": "application/json", 
      "Connection": "close", // Cierra el socket tras responder para no bloquear Oak
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
