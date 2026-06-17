/**
 * mockSql.ts — Componente auxiliar para pruebas (testing)
 * 
 * En la iteración actual de pruebas, se determinó utilizar la base de datos real
 * para la ejecución de pruebas integradas. 
 * 
 * Este archivo permanece como una plantilla técnica en caso de requerir
 * el aislamiento completo de las pruebas unitarias de los modelos, permitiendo
 * simular el comportamiento del tagged template string `sql` de postgres.
 */

export const mockSql = (strings: TemplateStringsArray, ...values: any[]) => {
  // Simulador básico de respuesta para consultas estructuradas SQL.
  console.log("Mock SQL llamado con:", strings, values);
  return Promise.resolve([]);
};
