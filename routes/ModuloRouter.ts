import { Router } from "../dependencies/dependencias.ts";
import {
  getModulos,
  getModuloPorIdentificador,
  getSeccionPorNivel,
} from "../controllers/ModuloController.ts";
import { authMiddleware } from "../middleware/AuthMiddleware.ts";

const ModuloRouter = new Router();

// Pública: la lista de módulos se muestra en el Home sin autenticar
ModuloRouter.get("/api/modulos", getModulos);

// Protegidas: detalle y sección requieren JWT
ModuloRouter.get("/api/modulos/:identificador", authMiddleware, getModuloPorIdentificador);
ModuloRouter.get("/api/modulos/:identificador/seleccionador/:nivel",authMiddleware, getSeccionPorNivel);

export { ModuloRouter };
