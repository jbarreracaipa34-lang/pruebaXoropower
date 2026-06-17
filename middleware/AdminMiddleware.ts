/**
 * Middleware que verifica que el usuario autenticado tenga el rol de 'admin'.
 * Debe usarse DESPUÉS de authMiddleware, ya que depende de ctx.state.user.
 */
export const adminMiddleware = async (ctx: any, next: () => Promise<unknown>) => {
  const user = ctx.state.user;

  if (!user || user.rol !== "admin") {
    ctx.response.status = 403;
    ctx.response.body = {
      success: false,
      message: "Acceso denegado. Se requiere rol de administrador.",
    };
    return;
  }

  await next();
};
