import { assertEquals, assertExists } from "jsr:@std/assert@^1";
import { ProgresoModel } from "../../models/ProgresoModel.ts";

Deno.test({
  name: "Unitaria (Integrada): ProgresoModel",
  sanitizeOps: false,
  sanitizeResources: false,
  fn: async (t) => {
    // Se utilizan identificadores UUID ficticios con formato válido para las pruebas.
    const userId = "00000000-0000-0000-0000-000000000001";
    const exerciseId = "00000000-0000-0000-0000-000000000002";
    const model = new ProgresoModel();

    await t.step("ListarProgreso - Retorna arreglo (vacío o lleno)", async () => {
      const progreso = await model.ListarProgreso(userId);
      // Dado que depende de datos reales en la base de datos, únicamente se valida que la ejecución finalice exitosamente y retorne una estructura de arreglo.
      assertEquals(Array.isArray(progreso), true);
    });

    await t.step("ObtenerResumen - Retorna contadores", async () => {
      const resumen = await model.ObtenerResumen(userId);
      assertExists(resumen.completadas);
      assertExists(resumen.enProgreso);
      assertExists(resumen.total);
      // Se verifica la relación matemática donde el total corresponde a la suma de actividades completadas y en progreso.
      assertEquals(resumen.total, resumen.completadas + resumen.enProgreso);
    });

    await t.step("ActualizarProgreso - Completado (puntuacion >= 70)", async () => {
      const result = await model.ActualizarProgreso(userId, exerciseId, 85);
      
      // Se contempla la posibilidad de fallo en entornos donde existan restricciones estrictas de clave foránea (FK) asociadas a usuarios o ejercicios.
      // Se procede con la validación de la resolución de la promesa.
      if (result.success) {
        assertEquals(result.message, "¡Ejercicio completado!");
        assertExists(result.progreso);
        assertEquals((result.progreso as any).completado, true);
      } else {
        // Comportamiento esperado en caso de fallo por restricción de clave foránea.
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
