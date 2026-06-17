import { Router } from "../dependencies/dependencias.ts";
import { getRacha, getHistorialSemanal, getHistorialEjercicio } from "../controllers/GamificacionController.ts";
import { authMiddleware } from "../middleware/AuthMiddleware.ts";

const GamificacionRouter = new Router();

GamificacionRouter.get("/api/racha", authMiddleware, getRacha);
GamificacionRouter.get("/api/historial/semanal", authMiddleware, getHistorialSemanal);
GamificacionRouter.get("/api/historial/:idEjercicio", authMiddleware, getHistorialEjercicio);

export { GamificacionRouter };
