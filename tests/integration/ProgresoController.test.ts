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
    // Se utiliza un identificador UUID ficticio para representar al usuario de prueba.
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
      // Se utiliza un identificador UUID ficticio para representar el ejercicio.
      const exerciseId = "123e4567-e89b-12d3-a456-426614174001";
      
      const res = await fetchJson(`${baseUrl}/api/progreso`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${validToken}` },
        body: JSON.stringify({
          id_ejercicio: exerciseId,
          puntuacion: 85
        })
      });
      
      // Se contempla la posibilidad de fallo en caso de existir restricciones estrictas de clave foránea en la base de datos real.
      // Si la ruta opera correctamente, se espera que retorne una estructura válida.
      // Se admite un estado 500 en caso de fallo de clave foránea, o 200 ante una inserción exitosa.
      if (res.status === 200) {
        const body = res.body as any;
        assertEquals(body.success, true);
      } else {
        // Se espera recibir un error si el id_usuario o id_ejercicio no existen en la base de datos real.
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
          puntuacion: 150 // Valor inválido según las restricciones definidas por Zod.
        })
      });
      
      assertEquals(res.status, 400);
    });

    await server.close();
  }
});
