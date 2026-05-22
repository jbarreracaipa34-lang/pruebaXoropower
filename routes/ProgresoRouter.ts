import { Router } from "../dependencies/dependencias.ts";
import { getProgreso, getResumen, postProgreso } from "../controllers/ProgresoController.ts";
import { authMiddleware } from "../middleware/AuthMiddleware.ts";

const ProgresoRouter = new Router();

ProgresoRouter.get("/api/progreso",authMiddleware, getProgreso);
ProgresoRouter.get("/api/progreso/resumen",authMiddleware, getResumen);
ProgresoRouter.post("/api/progreso",authMiddleware, postProgreso);

export { ProgresoRouter };
