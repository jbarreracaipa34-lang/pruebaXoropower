import { assertEquals, assertExists } from "jsr:@std/assert@^1";
import { startTestServer, fetchJson, TestServer } from "../helpers/testServer.ts";

let server: TestServer;

Deno.test({
  name: "Integración: AuthController",
  sanitizeOps: false,
  sanitizeResources: false,
  fn: async (t) => {
    // Configuración antes de todas las pruebas del grupo
    server = await startTestServer();
    const baseUrl = server.baseUrl;

    // Correo aleatorio para evitar conflictos en BD real
    const randomEmail = `test.user.${Date.now()}@xoropower.app`;
    const validPassword = "securePassword123";

    await t.step("POST /api/autenticacion/registro - Registro exitoso", async () => {
      const res = await fetchJson(`${baseUrl}/api/autenticacion/registro`, {
        method: "POST",
        body: JSON.stringify({
          nombre_usuario: `Test User ${Date.now()}`,
          email: randomEmail,
          password: validPassword
        })
      });
      
      // Si el email ya existía (poco probable por Date.now()), manejamos 400
      if (res.status === 400 && (res.body as any).message.includes("ya está registrado")) {
        // Omitir si casualmente existía
        return;
      }
      assertEquals(res.status, 201);
      const body = res.body as any;
      assertEquals(body.success, true);
      assertExists(body.data.idUsuario);
    });

    await t.step("POST /api/autenticacion/registro - Validación Zod (email inválido)", async () => {
      const res = await fetchJson(`${baseUrl}/api/autenticacion/registro`, {
        method: "POST",
        body: JSON.stringify({
          nombre_usuario: "Test",
          email: "not-an-email",
          password: "123"
        })
      });
      
      assertEquals(res.status, 400);
      const body = res.body as any;
      assertEquals(body.success, false);
      assertExists(body.errors);
    });

    await t.step("POST /api/autenticacion/login - Credenciales válidas", async () => {
      const res = await fetchJson(`${baseUrl}/api/autenticacion/login`, {
        method: "POST",
        body: JSON.stringify({
          email: randomEmail,
          password: validPassword
        })
      });
      
      assertEquals(res.status, 200);
      const body = res.body as any;
      assertEquals(body.success, true);
      assertExists(body.data.access_token);
      assertExists(body.data.usuario.id);
    });

    await t.step("POST /api/autenticacion/login - Contraseña incorrecta", async () => {
      const res = await fetchJson(`${baseUrl}/api/autenticacion/login`, {
        method: "POST",
        body: JSON.stringify({
          email: randomEmail,
          password: "wrongpassword"
        })
      });
      
      assertEquals(res.status, 401);
      const body = res.body as any;
      assertEquals(body.success, false);
    });

    await t.step("POST /api/autenticacion/cerrar-sesion", async () => {
      const res = await fetchJson(`${baseUrl}/api/autenticacion/cerrar-sesion`, {
        method: "POST"
      });
      
      // El endpoint no requiere autenticación, retorna 200
      assertEquals(res.status, 200);
      const body = res.body as any;
      assertEquals(body.success, true);
    });

    // Limpieza
    await server.close();
  }
});
