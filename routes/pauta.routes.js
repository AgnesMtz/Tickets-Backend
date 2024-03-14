import express from "express";
import {
    crearPauta,
    crearPautaExcel,
    mostrarDatos,
    editarTask,
    editarPauta,
    mostrarPautas,
    autorizarPauta,
    mostrarTask,
    borrarPauta,
    borrarTask
} from "../controllers/pauta.controller.js"
import { 
    crearTicket,
    asignarTicket,
    cambiarAsignacionTicket,
    mostrarTodosTickets,
    mostrarMisTickets, 
    ticketPrueba,
    mostrarDatosTicket,
    mostrarMisTicketsCliente,
    mostrarTicket,
    obtenerTicket,
    subirTicket,
    cambiarEstado,
    subirComentarios,
    cambiarEstadoAprobado,
    cambiarEstadoCancelado
} from "../controllers/ticket.controller.js"

import {
    upload
} from "../controllers/archivos.js"

const router = express.Router()

// Funciones Diego
router.post('/crear-pauta/', crearPauta)
router.post('/crear-pautaEx/:id', upload.single('pauta') , crearPautaExcel)
router.get('/crear-pauta/', mostrarDatos)
router.get('/mostrar-pauta/:id', mostrarPautas)
router.get('/mostrar-task/:id', mostrarTask)
router.put('/mostrar-pauta/:taskId', editarTask)
router.put('/editar-pauta/:pautaId', editarPauta)
router.put('/borrar-task/:taskId', borrarTask)
router.put('/borrar-pauta/:pautaId', borrarPauta)
// Aun de Diego pero sobre tickets
router.get('/mostrar-tickets/', mostrarTodosTickets)
router.get('/mostrar-tickets/:workerId', mostrarMisTickets)
router.get('/mostrar-ticketsCliente/:clientId', mostrarMisTicketsCliente)
router.get('/mostrar-ticket/:ticketId', mostrarTicket)
router.get('/prueba-ticket/', ticketPrueba)
router.put('/subir-ticket/:ticketId', upload.single('ticket') , subirTicket)
router.put('/editar-estado/:ticketId', cambiarEstado)
router.put('/editar-estadoAprobado/:ticketId', cambiarEstadoAprobado)
router.put('/editar-estadoCancelado/:ticketId', cambiarEstadoCancelado)
router.put('/subir-comentarios/:ticketId', subirComentarios)

// Funciones Arturo
router.put('/autorizar-pauta/', autorizarPauta)
router.get('/crear-ticket/', mostrarDatosTicket)

router.post('/crear-ticket/', crearTicket)
router.get('/obtener-ticket/:ticketId', obtenerTicket)

router.post('/asignar-ticket/', asignarTicket)
router.put('/cambiar-asignacion-ticket/', cambiarAsignacionTicket)

export default router