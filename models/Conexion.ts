import { postgres, load } from "../dependencies/dependencias.ts";

let connectionString = Deno.env.get("DATABASE_URL");

// Si no está en las variables de la nube (significa que estás en tu PC)
if (!connectionString) {
  try {
    const env = await load();
    connectionString = env["DATABASE_URL"];
  } catch (_e) {
    // Si falla load() en la nube, no pasa nada porque buscaremos el plan C
  }
}

// Plan C: Si sigue vacío, le ponemos tu URL local a la fuerza
if (!connectionString) {
  connectionString = "postgres://postgres:1234@localhost:5432/xoropower";
}

export const sql = postgres(connectionString, {
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});

console.log("✅ Conexión a PostgreSQL establecida correctamente.");