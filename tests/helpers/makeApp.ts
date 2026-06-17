/**
 * makeApp.ts — Componente auxiliar de pruebas (testing)
 * Construye la misma instancia de la aplicación Oak empleada en main.ts,
 * omitiendo el inicio del listener con el fin de poder delegar la ejecución
 * a un servidor de pruebas de puerto efímero.
 */
import { Application, oakCors } from "../../dependencies/dependencias.ts";
import { AuthRouter }    from "../../routes/AuthRouter.ts";
import { ModuloRouter }  from "../../routes/ModuloRouter.ts";
import { ProgresoRouter } from "../../routes/ProgresoRouter.ts";
import { RitmoRouter }    from "../../routes/RitmoRouter.ts";

export function makeApp(): Application {
  const app = new Application();

  // Configuración del mecanismo de CORS idéntica a la utilizada en producción.
  app.use(oakCors({
    origin:         "*",
    methods:        ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

  // Configuración y registro de los enrutadores (routers) disponibles en la aplicación.
  const routers = [AuthRouter, ModuloRouter, ProgresoRouter, RitmoRouter];
  routers.forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
  });

  // Manejo de la ruta de estado (health check) y controlador de respaldo para rutas no encontradas (404 fallback).
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
