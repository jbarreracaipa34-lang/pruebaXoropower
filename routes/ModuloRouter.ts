import { Router } from "../dependencies/dependencias.ts";
import {
  getModulos,
  getModuloPorIdentificador,
  getSeccionPorNivel,
} from "../controllers/ModuloController.ts";
import { authMiddleware } from "../middleware/AuthMiddleware.ts";

const ModuloRouter = new Router();

// Ruta pública: se permite la obtención del listado de módulos sin requerir autenticación para mostrarse en la pantalla de inicio.
ModuloRouter.get("/api/modulos", getModulos);

// Rutas protegidas: la consulta de detalles de un módulo y la sección por nivel requieren la verificación de un token JWT válido.
ModuloRouter.get("/api/modulos/:identificador", authMiddleware, getModuloPorIdentificador);
ModuloRouter.get("/api/modulos/:identificador/seleccionador/:nivel",authMiddleware, getSeccionPorNivel);

export { ModuloRouter };
