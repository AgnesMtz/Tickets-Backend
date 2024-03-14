import express from "express";
import {
    registrarUsuario,
    obtenerTrabajadores,
    obtenerUsuarios,
    registrarCliente,
    obtenerClientes,
    registrarContact,
    registrarBranch, 
    mostrarWorkers,
    obtenerCliente,
    obtenerCliente2
} from "../controllers/usuarioController.js"

const router = express.Router()

router.post('/registrar-usuario/', registrarUsuario)
router.get('/obtener-trabajadores/', obtenerTrabajadores)
router.get('/obtener-usuarios/', obtenerUsuarios)
router.get('/registrar-cliente/', mostrarWorkers)
router.post('/registrar-cliente/', registrarCliente)
router.get('/obtener-clientes/', obtenerClientes)
router.post('/registrar-contact/', registrarContact)
router.get('/obtener-cliente/:userId', obtenerCliente)
router.get('/obtener-cliente2/:clientId', obtenerCliente2)

export default router