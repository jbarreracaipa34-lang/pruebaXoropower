import { Router } from "../dependencies/dependencias.ts";
import { getEjerciciosRitmo, getEjercicioRitmoDetalle, postCrearEjercicio } from "../controllers/RitmoController.ts";
import { authMiddleware } from "../middleware/AuthMiddleware.ts";
import { adminMiddleware } from "../middleware/AdminMiddleware.ts";

const RitmoRouter = new Router();

// Rutas protegidas que requieren que el usuario esté debidamente autenticado mediante un token JWT.
RitmoRouter.get("/api/ejercicios-ritmo", authMiddleware, getEjerciciosRitmo);
RitmoRouter.get("/api/ejercicios-ritmo/:id", authMiddleware, getEjercicioRitmoDetalle);

// Ruta exclusiva para administradores: crear un nuevo ejercicio de ritmo.
RitmoRouter.post("/api/ejercicios-ritmo", authMiddleware, adminMiddleware, postCrearEjercicio);

export { RitmoRouter };
