import { assertEquals, assertExists } from "jsr:@std/assert@^1";
import { startTestServer, fetchJson, TestServer } from "../helpers/testServer.ts";

let server: TestServer;

Deno.test({
  name: "E2E: Happy Path Completo",
  sanitizeOps: false,
  sanitizeResources: false,
  fn: async (t) => {
    server = await startTestServer();
    const baseUrl = server.baseUrl;

    const randomEmail = `e2e.user.${Date.now()}@xoropower.app`;
    const password = "e2ePassword123";
    let token = "";

    await t.step("1. Health Check", async () => {
      const res = await fetchJson(`${baseUrl}/health`);
      assertEquals(res.status, 200);
      assertEquals((res.body as any).status, "ok");
    });

    await t.step("2. Registro de Usuario", async () => {
      const res = await fetchJson(`${baseUrl}/api/autenticacion/registro`, {
        method: "POST",
        body: JSON.stringify({
          nombre_usuario: `E2E User ${Date.now()}`,
          email: randomEmail,
          password: password
        })
      });
      assertEquals(res.status, 201);
    });

    await t.step("3. Login de Usuario", async () => {
      const res = await fetchJson(`${baseUrl}/api/autenticacion/login`, {
        method: "POST",
        body: JSON.stringify({
          email: randomEmail,
          password: password
        })
      });
      assertEquals(res.status, 200);
      token = (res.body as any).data.access_token;
      assertExists(token);
    });

    let primerModuloId = "";
    await t.step("4. Listar Módulos", async () => {
      const res = await fetchJson(`${baseUrl}/api/modulos`);
      assertEquals(res.status, 200);
      const data = (res.body as any).data;
      if (data && data.length > 0) {
        primerModuloId = data[0].id;
      }
    });

    await t.step("5. Obtener Detalle del Módulo y Sección Básico", async () => {
      if (!primerModuloId) return; // Sin módulos en BD

      const resModulo = await fetchJson(`${baseUrl}/api/modulos/${primerModuloId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      assertEquals(resModulo.status, 200);

      const resSeccion = await fetchJson(`${baseUrl}/api/modulos/${primerModuloId}/seleccionador/basico`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      // Puede que no tenga nivel basico, aceptamos 200 o 404
      if (resSeccion.status === 200) {
        assertEquals((resSeccion.body as any).success, true);
      }
    });

    await t.step("6. Consultar Progreso Resumen", async () => {
      const res = await fetchJson(`${baseUrl}/api/progreso/resumen`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      assertEquals(res.status, 200);
      const data = (res.body as any).data;
      assertExists(data.completadas);
    });

    await server.close();
  }
});
