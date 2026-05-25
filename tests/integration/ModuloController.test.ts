import { assertEquals, assertExists } from "jsr:@std/assert@^1";
import { startTestServer, fetchJson, TestServer } from "../helpers/testServer.ts";
import { create, getNumericDate } from "../../dependencies/dependencias.ts";
import { load } from "../../dependencies/dependencias.ts";

let server: TestServer;
let validToken: string;

Deno.test({
  name: "Integración: ModuloController",
  sanitizeOps: false,
  sanitizeResources: false,
  fn: async (t) => {
    server = await startTestServer();
    const baseUrl = server.baseUrl;

    // Generar un token válido temporal para las rutas protegidas
    const env = await load();
    const JWT_SECRET = env["JWT_SECRET"] || Deno.env.get("JWT_SECRET") || "secret";
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    validToken = await create(
      { alg: "HS256", typ: "JWT" },
      { sub: "test-user-id", email: "test@test.com", exp: getNumericDate(3600) },
      key
    );

    let primerModuloId = "";

    await t.step("GET /api/modulos - Listar módulos", async () => {
      const res = await fetchJson(`${baseUrl}/api/modulos`);
      
      assertEquals(res.status, 200);
      const body = res.body as any;
      assertEquals(body.success, true);
      assertExists(body.data);
      
      if (body.data.length > 0) {
        primerModuloId = body.data[0].id;
      }
    });

    await t.step("GET /api/modulos/:id - Detalle de un módulo (si existe)", async () => {
      if (!primerModuloId) return; // Si BD vacía, saltar
      
      const res = await fetchJson(`${baseUrl}/api/modulos/${primerModuloId}`, {
        headers: { "Authorization": `Bearer ${validToken}` }
      });
      
      assertEquals(res.status, 200);
      const body = res.body as any;
      assertEquals(body.success, true);
      assertEquals(body.data.id, primerModuloId);
    });

    await t.step("GET /api/modulos/:id - UUID inválido", async () => {
      const res = await fetchJson(`${baseUrl}/api/modulos/invalid-uuid`, {
        headers: { "Authorization": `Bearer ${validToken}` }
      });
      
      assertEquals(res.status, 400);
    });

    await t.step("GET /api/modulos/:id/seleccionador/:nivel - Nivel básico", async () => {
      if (!primerModuloId) return; // Si BD vacía, saltar
      
      const res = await fetchJson(`${baseUrl}/api/modulos/${primerModuloId}/seleccionador/basico`, {
        headers: { "Authorization": `Bearer ${validToken}` }
      });
      
      // Podría ser 200 o 404 dependiendo de los datos, validamos la estructura general
      if (res.status === 200) {
        const body = res.body as any;
        assertEquals(body.success, true);
        assertExists(body.data.nivel);
      } else {
        assertEquals(res.status, 404);
      }
    });

    await server.close();
  }
});
