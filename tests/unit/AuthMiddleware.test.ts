import { assertEquals } from "jsr:@std/assert@^1";
import { authMiddleware } from "../../middleware/AuthMiddleware.ts";
import { create, getNumericDate } from "../../dependencies/dependencias.ts";
import { load } from "../../dependencies/dependencias.ts";

const env = await load();
const JWT_SECRET = env["JWT_SECRET"] || Deno.env.get("JWT_SECRET") || "secret";

const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);

Deno.test("AuthMiddleware - Sin Header Authorization - 401", async () => {
  const ctx = {
    request: { headers: new Headers() },
    response: { status: 200, body: null as any },
    state: {} as any
  };

  let nextCalled = false;
  const next = async () => { nextCalled = true; };

  await authMiddleware(ctx, next);

  assertEquals(ctx.response.status, 401);
  assertEquals(ctx.response.body.success, false);
  assertEquals(nextCalled, false);
});

Deno.test("AuthMiddleware - Token Inválido - 401", async () => {
  const ctx = {
    request: { headers: new Headers({ "Authorization": "Bearer invalid.token.here" }) },
    response: { status: 200, body: null as any },
    state: {} as any
  };

  let nextCalled = false;
  const next = async () => { nextCalled = true; };

  await authMiddleware(ctx, next);

  assertEquals(ctx.response.status, 401);
  assertEquals(ctx.response.body.success, false);
  assertEquals(nextCalled, false);
});

Deno.test("AuthMiddleware - Token Válido - Llama a next()", async () => {
  const token = await create(
    { alg: "HS256", typ: "JWT" },
    { sub: "test-user-id", exp: getNumericDate(3600) },
    key
  );

  const ctx = {
    request: { headers: new Headers({ "Authorization": `Bearer ${token}` }) },
    response: { status: 200, body: null as any },
    state: {} as any
  };

  let nextCalled = false;
  const next = async () => { nextCalled = true; };

  await authMiddleware(ctx, next);

  assertEquals(nextCalled, true);
  assertEquals(ctx.state.user.sub, "test-user-id");
});
