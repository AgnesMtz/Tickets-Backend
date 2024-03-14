import { Router } from "express";
import { login, recoverPassword, resetPassword, validarToken} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);

// Valida si el token enviado existe en algun usuario
router.get("/validate_token/:token", validarToken)

// Asigna token al usuario con el correo indicado
router.post("/recover_password", recoverPassword)

// Cambia contraseña al usuario con el token mandado
router.put("/recover_password", resetPassword)

export default router;
