/**
 * makeApp.ts — Helper de testing
 * Construye la misma aplicación Oak que usa main.ts,
 * pero sin iniciar el listener, para poder pasarla
 * a un servidor de prueba efímero.
 */
import { Application, oakCors } from "../../dependencies/dependencias.ts";
import { AuthRouter }    from "../../routes/AuthRouter.ts";
import { ModuloRouter }  from "../../routes/ModuloRouter.ts";
import { ProgresoRouter } from "../../routes/ProgresoRouter.ts";
import { RitmoRouter }    from "../../routes/RitmoRouter.ts";

export function makeApp(): Application {
  const app = new Application();

  // CORS idéntico al de producción
  app.use(oakCors({
    origin:         "*",
    methods:        ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

  // Routers
  const routers = [AuthRouter, ModuloRouter, ProgresoRouter, RitmoRouter];
  routers.forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
  });

  // Health + 404 fallback
  app.use((ctx) => {
    if (ctx.request.url.pathname === "/health") {
      ctx.response.body = { status: "ok", service: "xoropower-api", version: "1.0.0" };
      return;
    }
    ctx.response.status = 404;
    ctx.response.body   = { success: false, message: "Ruta no encontrada." };
  });

  return app;
}
