import { assertEquals, assertExists } from "jsr:@std/assert@^1";
import { startTestServer, fetchJson, TestServer } from "../helpers/testServer.ts";

let server: TestServer;

Deno.test({
  name: "Integración: AuthController",
  sanitizeOps: false,
  sanitizeResources: false,
  fn: async (t) => {
    // Se realiza la inicialización y configuración antes del inicio de todas las pruebas del grupo.
    server = await startTestServer();
    const baseUrl = server.baseUrl;

    // Se genera una dirección de correo electrónico aleatoria con el fin de prevenir conflictos por duplicidad en la base de datos real.
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
      
      // En caso de que la dirección de correo electrónico ya se encuentre registrada, se procesa el código de estado 400.
      if (res.status === 400 && (res.body as any).message.includes("ya está registrado")) {
        // Se omite la aserción si existió una coincidencia casual en los datos.
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
      
      // Este punto de acceso no requiere autenticación obligatoria y retorna un estado 200.
      assertEquals(res.status, 200);
      const body = res.body as any;
      assertEquals(body.success, true);
    });

    // Se procede con el cierre del servidor y la limpieza de los recursos del entorno.
    await server.close();
  }
});
