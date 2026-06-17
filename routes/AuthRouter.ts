import { Router } from "../dependencies/dependencias.ts";
import { postRegistro, postLogin, postCerrarSesion, postPromoverAdmin } from "../controllers/AuthController.ts";
import { authMiddleware } from "../middleware/AuthMiddleware.ts";
import { adminMiddleware } from "../middleware/AdminMiddleware.ts";

const AuthRouter = new Router();

AuthRouter.post("/api/autenticacion/registro", postRegistro);
AuthRouter.post("/api/autenticacion/login",    postLogin);
AuthRouter.post("/api/autenticacion/cerrar-sesion", postCerrarSesion);
AuthRouter.post("/api/autenticacion/promover-admin", authMiddleware, adminMiddleware, postPromoverAdmin);

export { AuthRouter };
