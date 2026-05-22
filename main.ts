import { Application, oakCors } from "./dependencies/dependencias.ts";
import { AuthRouter }    from "./routes/AuthRouter.ts";
import { ModuloRouter }  from "./routes/ModuloRouter.ts";
import { ProgresoRouter } from "./routes/ProgresoRouter.ts";
import { RitmoRouter }    from "./routes/RitmoRouter.ts";

const PORT = Number(Deno.env.get("PORT") ?? 8080);

const app = new Application();

// ── CORS global ───────────────────────────────────────────────
app.use(oakCors({
  origin:         "*",
  methods:        ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ── Routers ───────────────────────────────────────────────────
const routers = [AuthRouter, ModuloRouter, ProgresoRouter, RitmoRouter];

routers.forEach(router => {
  app.use(router.routes());
  app.use(router.allowedMethods());
});

app.use((ctx) => {
  if (ctx.request.url.pathname === "/health") {
    ctx.response.body = { status: "ok", service: "xoropower-api", version: "1.0.0" };
    return;
  }
  ctx.response.status = 404;
  ctx.response.body   = { success: false, message: "Ruta no encontrada." };
});

console.log(`[Xoropower API] Corriendo en http://localhost:${PORT}`);
await app.listen({ port: PORT });
