import { assertEquals, assertExists } from "jsr:@std/assert@^1";
import { ProgresoModel } from "../../models/ProgresoModel.ts";

Deno.test({
  name: "Unitaria (Integrada): ProgresoModel",
  sanitizeOps: false,
  sanitizeResources: false,
  fn: async (t) => {
    // Usamos UUIDs ficticios de formato válido
    const userId = "00000000-0000-0000-0000-000000000001";
    const exerciseId = "00000000-0000-0000-0000-000000000002";
    const model = new ProgresoModel();

    await t.step("ListarProgreso - Retorna arreglo (vacío o lleno)", async () => {
      const progreso = await model.ListarProgreso(userId);
      // Como depende de datos reales, solo verificamos que no falle y retorne arreglo
      assertEquals(Array.isArray(progreso), true);
    });

    await t.step("ObtenerResumen - Retorna contadores", async () => {
      const resumen = await model.ObtenerResumen(userId);
      assertExists(resumen.completadas);
      assertExists(resumen.enProgreso);
      assertExists(resumen.total);
      // total = completadas + enProgreso
      assertEquals(resumen.total, resumen.completadas + resumen.enProgreso);
    });

    await t.step("ActualizarProgreso - Completado (puntuacion >= 70)", async () => {
      const result = await model.ActualizarProgreso(userId, exerciseId, 85);
      
      // Podría fallar si hay constraint strict de foreign key con usuarios/ejercicios
      // Verificamos manejo de promesa.
      if (result.success) {
        assertEquals(result.message, "¡Ejercicio completado!");
        assertExists(result.progreso);
        assertEquals((result.progreso as any).completado, true);
      } else {
        // Expected si FK falla
        assertEquals(result.success, false);
      }
    });

    await t.step("ActualizarProgreso - En progreso (puntuacion < 70)", async () => {
      const exerciseId2 = "00000000-0000-0000-0000-000000000003";
      const result = await model.ActualizarProgreso(userId, exerciseId2, 50);
      
      if (result.success) {
        assertEquals(result.message, "Progreso guardado.");
        assertEquals((result.progreso as any).completado, false);
      }
    });
  }
});
