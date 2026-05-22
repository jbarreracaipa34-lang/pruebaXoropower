import { verify, load } from "../dependencies/dependencias.ts";

const env = await load();
const JWT_SECRET = env["JWT_SECRET"] || Deno.env.get("JWT_SECRET") || "secret";

const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["verify"]
);

export const authMiddleware = async (ctx: any, next: () => Promise<unknown>) => {
  const authHeader = ctx.request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    ctx.response.status = 401;
    ctx.response.body = { success: false, message: "Token faltante o inválido." };
    return;
  }

  const token = authHeader.slice(7);

  try {
    const payload = await verify(token, key);
    ctx.state.user = payload;
    await next();
  } catch {
    ctx.response.status = 401;
    ctx.response.body = { success: false, message: "Token inválido o expirado." };
  }
};
