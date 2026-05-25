import { Router } from "../dependencies/dependencias.ts";
import { postRegistro, postLogin, postCerrarSesion } from "../controllers/AuthController.ts";

const AuthRouter = new Router();

AuthRouter.post("/api/autenticacion/registro", postRegistro);
AuthRouter.post("/api/autenticacion/login",    postLogin);
AuthRouter.post("/api/autenticacion/cerrar-sesion", postCerrarSesion);

export { AuthRouter };
