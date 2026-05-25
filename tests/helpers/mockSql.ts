/**
 * mockSql.ts — Helper de testing
 * 
 * En esta iteración de las pruebas, decidimos usar la base de datos real
 * para pruebas integradas (Unitarias Integradas). 
 * 
 * Sin embargo, este archivo queda como plantilla por si en el futuro
 * se desea aislar completamente los Unit Tests de los Modelos mockeando
 * el tagged template string `sql` de postgres.
 */

export const mockSql = (strings: TemplateStringsArray, ...values: any[]) => {
  // Simulador básico de respuesta de consulta SQL
  console.log("Mock SQL llamado con:", strings, values);
  return Promise.resolve([]);
};
