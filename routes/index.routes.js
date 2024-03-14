import { Router } from "express";
import { conectarDB } from "../database/db.js";

const router = Router();

// Este archivo y funcion es unicamente para hacer ping a la base de datos y API
router.get("/ping", async (req, res) => {
    const connection = await conectarDB(); //Se conecta a la base de datos
    const [rows] = await connection.query(`SELECT 12 + 1 as result`); //Aqui se hace la consulta a la base de datos
    res.json(rows); //Se devuleve el resultado al navegador
});

export default router;
