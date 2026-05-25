import { assertEquals, assertExists } from "jsr:@std/assert@^1";
import { UsuarioModel } from "../../models/UsuarioModel.ts";

Deno.test({
  name: "Unitaria (Integrada): UsuarioModel",
  sanitizeOps: false,
  sanitizeResources: false,
  fn: async (t) => {
    const randomEmail = `model.test.${Date.now()}@xoropower.app`;
    const password = "securePassword123";
    let userId = "";

    await t.step("Registrar - Crea usuario correctamente", async () => {
      const nombreUsuario = `Model Test User ${Date.now()}`;
      const model = new UsuarioModel({
        idUsuario: undefined,
        email: randomEmail,
        nombreUsuario: nombreUsuario,
      });

      const result = await model.Registrar(password);
      assertEquals(result.success, true);
      assertExists(result.usuario.idUsuario);
      userId = result.usuario.idUsuario;
    });

    await t.step("BuscarPorEmail - Encuentra usuario", async () => {
      const model = new UsuarioModel({
        idUsuario: undefined,
        email: randomEmail,
        nombreUsuario: "",
      });

      const usuario = await model.BuscarPorEmail();
      assertExists(usuario);
      assertEquals(usuario?.email, randomEmail);
      assertExists(usuario?.nombreUsuario);
      assertExists(usuario?.passwordHash);
    });

    await t.step("VerificarPassword - Correcta vs Incorrecta", async () => {
      const model = new UsuarioModel({
        idUsuario: undefined,
        email: randomEmail,
        nombreUsuario: "",
      });

      const usuario = await model.BuscarPorEmail();
      assertExists(usuario?.passwordHash);

      const isCorrect = await model.VerificarPassword(password, usuario!.passwordHash!);
      assertEquals(isCorrect, true);

      const isWrong = await model.VerificarPassword("wrong_password", usuario!.passwordHash!);
      assertEquals(isWrong, false);
    });

    await t.step("ActualizarUltimoAcceso - No lanza error", async () => {
      const model = new UsuarioModel();
      // Simply asserting it resolves without error
      await model.ActualizarUltimoAcceso(userId);
    });
  }
});
