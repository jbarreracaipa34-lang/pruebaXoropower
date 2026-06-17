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
}).strict();

const promoverAdminSchema = z.object({
  email:    z.string().email("Email inválido."),
  password: z.string().min(1, "La contraseña es requerida."),
}).strict();

// Definición e inicialización de la clave secreta JWT (patrón Singleton) para firmar tokens.
const env = await load();
const JWT_SECRET = env["JWT_SECRET"] || "secret";
const jwtKey = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);


// Ruta POST /api/autenticacion/registro: Procesa el registro de un nuevo usuario en la plataforma.
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

// Ruta POST /api/autenticacion/login: Autentica a un usuario y genera un token JWT de acceso.
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
      { sub: usuario.idUsuario, email: usuario.email, rol: usuario.rol, exp: getNumericDate(60 * 60 * 24 * 15) },
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
          avatar: usuario.avatar ?? "🤠",
          rol: usuario.rol ?? "estudiante"
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

// Ruta POST /api/autenticacion/promover-admin: Solo un admin puede promover a otro usuario a administrador.
export const postPromoverAdmin = async (ctx: Context) => {
  const { response, request } = ctx;
  try {
    const body = await request.body.json();
    const { email, password } = promoverAdminSchema.parse(body);

    // Verificar la contraseña del admin que hace la solicitud
    const adminEmail = (ctx as any).state.user?.email;
    console.log("[DEBUG promoverAdmin] adminEmail del token:", adminEmail);
    if (!adminEmail) {
      response.status = 401;
      response.body = { success: false, message: "No autenticado." };
      return;
    }
    const adminModel = new UsuarioModel({ idUsuario: undefined, email: adminEmail, nombreUsuario: "" });
    const adminUsuario = await adminModel.BuscarPorEmail();
    if (!adminUsuario?.passwordHash) {
      response.status = 401;
      response.body = { success: false, message: "No se pudo verificar tu identidad." };
      return;
    }
    const passwordValida = await adminModel.VerificarPassword(password, adminUsuario.passwordHash);
    if (!passwordValida) {
      response.status = 403;
      response.body = { success: false, message: "Contraseña incorrecta. Acción denegada." };
      return;
    }

    const model = new UsuarioModel({ idUsuario: undefined, email, nombreUsuario: "" });
    const existente = await model.BuscarPorEmail();

    if (!existente) {
      response.status = 404;
      response.body = { success: false, message: "No existe un usuario registrado con ese correo." };
      return;
    }

    if (existente.rol === "admin") {
      response.status = 200;
      response.body = { success: true, message: "Ese usuario ya es administrador." };
      return;
    }

    const result = await model.AsignarRolPorEmail(email, "admin");

    if (result.success) {
      response.status = 200;
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

// Ruta POST /api/autenticacion/cerrar-sesion: Cierra la sesión activa del usuario.
export const postCerrarSesion = (ctx: Context) => {
  ctx.response.status = 200;
  ctx.response.body = { success: true, message: "Sesión cerrada correctamente." };
};
