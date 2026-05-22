import { Context, z, create, getNumericDate, load } from "../dependencies/dependencias.ts";
import { UsuarioModel } from "../models/UsuarioModel.ts";

const loginSchema = z.object({
  email:    z.string().email("Email inválido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

const registroSchema = z.object({
  nombre_usuario: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  email:          z.string().email("Email inválido."),
  password:       z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

// ── JWT Key (singleton) ────────────────────────────────────────
const env = await load();
const JWT_SECRET = env["JWT_SECRET"] || "secret";
const jwtKey = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);


// POST /api/autenticacion/registro
export const postRegistro = async (ctx: Context) => {
  const { response, request } = ctx;
  try {
    const body = await request.body.json();
    const validated = registroSchema.parse(body);

    const model = new UsuarioModel({
      idUsuario:    undefined,
      email:        validated.email,
      nombreUsuario: validated.nombre_usuario,
    });

    const result = await model.Registrar(validated.password);

    if (result.success) {
      response.status = 201;
      response.body = { success: true, message: result.message, data: result.usuario };
    } else {
      response.status = 400;
      response.body = { success: false, message: result.message };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status = 400;
      response.body = { success: false, message: "Datos inválidos.", errors: error.format() };
    } else {
      console.error(error);
      response.status = 500;
      response.body = { success: false, message: "Error interno del servidor." };
    }
  }
};

// POST /api/autenticacion/login
export const postLogin = async (ctx: Context) => {
  const { response, request } = ctx;
  try {
    const body = await request.body.json();
    const validated = loginSchema.parse(body);

    const model = new UsuarioModel({ idUsuario: undefined, email: validated.email, nombreUsuario: "" });
    const usuario = await model.BuscarPorEmail();

    if (!usuario || !usuario.passwordHash) {
      response.status = 401;
      response.body = { success: false, message: "Credenciales inválidas." };
      return;
    }

    const passwordValida = await model.VerificarPassword(validated.password, usuario.passwordHash);
    if (!passwordValida) {
      response.status = 401;
      response.body = { success: false, message: "Credenciales inválidas." };
      return;
    }

    if (usuario.idUsuario) {
      await model.ActualizarUltimoAcceso(usuario.idUsuario);
    }

    const token = await create(
      { alg: "HS256", typ: "JWT" },
      { sub: usuario.idUsuario, email: usuario.email, exp: getNumericDate(60 * 60 * 24 * 15) },
      jwtKey
    );

    response.status = 200;
    response.body = {
      success: true,
      data: {
        access_token: token,
        usuario: {
          id: usuario.idUsuario ?? "",
          nombre_completo: usuario.nombreUsuario,
          email: usuario.email,
          avatar: usuario.avatar ?? "🤠"
        },
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status = 400;
      response.body = { success: false, message: "Datos inválidos.", errors: error.format() };
    } else {
      console.error(error);
      response.status = 500;
      response.body = { success: false, message: "Error interno del servidor." };
    }
  }
};

// POST /api/autenticacion/cerrar-sesion
export const postCerrarSesion = (ctx: Context) => {
  ctx.response.status = 200;
  ctx.response.body = { success: true, message: "Sesión cerrada correctamente." };
};
