// XOROPOWER — Conexión PostgreSQL (Singleton)
import { postgres, load } from "../dependencies/dependencias.ts";

const env = await load();
const connectionString = env["DATABASE_URL"] || Deno.env.get("DATABASE_URL");

if (!connectionString) {
  throw new Error("❌ DATABASE_URL no configurada en el archivo .env");
}

export const sql = postgres(connectionString, {
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});

console.log("✅ Conexión a PostgreSQL establecida correctamente.");
