import { postgres, load } from "../dependencies/dependencias.ts";

let connectionString = Deno.env.get("DATABASE_URL");

if (!connectionString) {
  try {
    const env = await load();
    connectionString = env["DATABASE_URL"];
  } catch (_e) {
    // No se encontró el archivo de entorno .env, por lo que se utilizarán los valores por defecto.
  }
}

if (!connectionString) {
  connectionString = "postgres://postgres:1234@localhost:5432/xoropower";
}

export const sql = postgres(connectionString, {
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});

console.log("Conexión a PostgreSQL establecida correctamente.");