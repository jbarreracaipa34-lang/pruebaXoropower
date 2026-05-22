import { Router } from "../dependencies/dependencias.ts";
import { getEjerciciosRitmo, getEjercicioRitmoDetalle } from "../controllers/RitmoController.ts";
import { authMiddleware } from "../middleware/AuthMiddleware.ts";

const RitmoRouter = new Router();

// Endpoints protegidos para asegurar que el usuario esté logueado
RitmoRouter.get("/api/ejercicios-ritmo", authMiddleware, getEjerciciosRitmo);
RitmoRouter.get("/api/ejercicios-ritmo/:id", authMiddleware, getEjercicioRitmoDetalle);

export { RitmoRouter };
