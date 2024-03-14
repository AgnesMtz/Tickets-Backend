import express from "express";
import { verCliente, crearContacto } from "../controllers/cliente.controller.js";

const router = express.Router();

router.get("/:id", verCliente);
router.post("/crear-contacto", crearContacto);

export default router;
