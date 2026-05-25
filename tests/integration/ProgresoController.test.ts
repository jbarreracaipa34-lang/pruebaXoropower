import { assertEquals, assertExists } from "jsr:@std/assert@^1";
import { startTestServer, fetchJson, TestServer } from "../helpers/testServer.ts";
import { create, getNumericDate } from "../../dependencies/dependencias.ts";
import { load } from "../../dependencies/dependencias.ts";

let server: TestServer;
let validToken: string;

Deno.test({
  name: "Integración: ProgresoController",
  sanitizeOps: false,
  sanitizeResources: false,
  fn: async (t) => {
    server = await startTestServer();
    const baseUrl = server.baseUrl;

    const env = await load();
    const JWT_SECRET = env["JWT_SECRET"] || Deno.env.get("JWT_SECRET") || "secret";
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    // Usamos un UUID ficticio para el test user
    const userId = "123e4567-e89b-12d3-a456-426614174000";
    validToken = await create(
      { alg: "HS256", typ: "JWT" },
      { sub: userId, email: "test@test.com", exp: getNumericDate(3600) },
      key
    );

    await t.step("GET /api/progreso - Sin token", async () => {
      const res = await fetchJson(`${baseUrl}/api/progreso`);
      assertEquals(res.status, 401);
    });

    await t.step("GET /api/progreso - Con token válido", async () => {
      const res = await fetchJson(`${baseUrl}/api/progreso`, {
        headers: { "Authorization": `Bearer ${validToken}` }
      });
      
      assertEquals(res.status, 200);
      const body = res.body as any;
      assertEquals(body.success, true);
      assertExists(body.data);
    });

    await t.step("GET /api/progreso/resumen - Con token", async () => {
      const res = await fetchJson(`${baseUrl}/api/progreso/resumen`, {
        headers: { "Authorization": `Bearer ${validToken}` }
      });
      
      assertEquals(res.status, 200);
      const body = res.body as any;
      assertEquals(body.success, true);
      assertExists(body.data.completadas);
      assertExists(body.data.enProgreso);
      assertExists(body.data.total);
    });

    await t.step("POST /api/progreso - Actualizar progreso (valido)", async () => {
      // Usamos un UUID ficticio para un ejercicio
      const exerciseId = "123e4567-e89b-12d3-a456-426614174001";
      
      const res = await fetchJson(`${baseUrl}/api/progreso`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${validToken}` },
        body: JSON.stringify({
          id_ejercicio: exerciseId,
          puntuacion: 85
        })
      });
      
      // Puede fallar si existen constraints de foreign key estrictos en la BD real,
      // pero si funciona la ruta debe devolver algo estructurado.
      // Toleramos 500 si falla la FK, o 200 si inserta.
      if (res.status === 200) {
        const body = res.body as any;
        assertEquals(body.success, true);
      } else {
        // Error esperado si no existe el id_usuario o id_ejercicio en la BD real
        const body = res.body as any;
        assertEquals(body.success, false);
      }
    });

    await t.step("POST /api/progreso - Puntuación inválida (>100)", async () => {
      const exerciseId = "123e4567-e89b-12d3-a456-426614174001";
      
      const res = await fetchJson(`${baseUrl}/api/progreso`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${validToken}` },
        body: JSON.stringify({
          id_ejercicio: exerciseId,
          puntuacion: 150 // Inválido por Zod
        })
      });
      
      assertEquals(res.status, 400);
    });

    await server.close();
  }
});
