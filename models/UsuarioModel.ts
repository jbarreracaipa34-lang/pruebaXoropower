import { sql } from "./Conexion.ts";
import { bcrypt } from "../dependencies/dependencias.ts";

export interface UsuarioData {
  idUsuario:   string | undefined;
  email:       string;
  nombreUsuario: string;
  passwordHash?: string;
  avatar?: string;
  rol?: string;
}

export class UsuarioModel {
  public _ObjUsuario: UsuarioData | null;

  constructor(objUsuario: UsuarioData | null = null) {
    this._ObjUsuario = objUsuario;
  }

  public async BuscarPorEmail(): Promise<UsuarioData | null> {
    if (!this._ObjUsuario?.email) {
      throw new Error("Email no proporcionado.");
    }
    const { email } = this._ObjUsuario;

    // Se intenta recuperar el avatar de la tabla avatares si existe un registro asociado al nombre de usuario.
    // Si no existe, se retorna el vaquero por defecto 🤠.
    const [usuario] = await sql`
      SELECT 
        u.id_usuario as "idUsuario",
        u.email, 
        u.nombre_usuario as "nombreUsuario",
        u.password_hash as "passwordHash",
        u.rol,
        COALESCE(a.url_imagen, '🤠') as avatar
      FROM usuarios u
      LEFT JOIN avatares a ON u.nombre_usuario = a.nombre
      WHERE u.email = ${email}
      LIMIT 1
    `;

    return (usuario as unknown as UsuarioData) ?? null;
  }

  public async Registrar(password: string): Promise<any> {
    try {
      const { email, nombreUsuario } = this._ObjUsuario!;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const [usuario] = await sql`
        INSERT INTO usuarios (nombre_usuario, email, password_hash, timestamp_ultimo_acceso)
        VALUES (${nombreUsuario}, ${email}, ${passwordHash}, NOW())
        RETURNING id_usuario as "idUsuario", nombre_usuario as "nombreUsuario", email, rol
      `;

      if (usuario) {
        // Se crea el registro correspondiente en la tabla avatares para asociar la imagen por defecto.
        await sql`
          INSERT INTO avatares (nombre, url_imagen)
          VALUES (${nombreUsuario}, '🤠')
          ON CONFLICT (nombre) DO NOTHING
        `;
        
        return {
          success: true,
          message: "Usuario registrado correctamente.",
          usuario: { ...usuario, avatar: "🤠" },
        };
      }
      throw new Error("No se pudo registrar.");
    } catch (error: any) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }

  public async VerificarPassword(plano: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plano, hash);
  }

  public async ActualizarUltimoAcceso(idUsuario: string): Promise<void> {
    try {
      await sql`
        UPDATE usuarios
        SET timestamp_ultimo_acceso = NOW()
        WHERE id_usuario = ${idUsuario}
      `;
    } catch (error) {
      console.error("Error al actualizar ultimo acceso:", error);
    }
  }

  /** Asigna un rol a un usuario existente identificado por email. */
  public async AsignarRolPorEmail(
    email: string,
    rol: "admin" | "estudiante"
  ): Promise<{ success: boolean; message: string; usuario?: UsuarioData }> {
    const [usuario] = await sql`
      UPDATE usuarios
      SET rol = ${rol}
      WHERE email = ${email}
      RETURNING id_usuario as "idUsuario", nombre_usuario as "nombreUsuario", email, rol
    `;

    if (!usuario) {
      return { success: false, message: "No existe un usuario con ese correo." };
    }

    return {
      success: true,
      message: rol === "admin"
        ? "Usuario promovido a administrador."
        : "Usuario actualizado a estudiante.",
      usuario: usuario as unknown as UsuarioData,
    };
  }
}
