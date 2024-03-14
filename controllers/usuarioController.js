import { json } from "express";
import { conectarDB } from "../database/db.js"
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarIdJWT.js";
import bcrypt from "bcrypt";

const registrarUsuario = async (req, res) => {

    const { name, firstLastName, secondLastName, email, password, phone, gender, position, dateJoined, birthDate, emerPhone } = req.body;
    try {
        const connection = await conectarDB()
        const [existeUsuario] = await connection.query(`SELECT COUNT(*) as usuario FROM user WHERE email = '${email}';`)

        if (existeUsuario.usuario != 0) {

            const error = new Error('¡Usuario ya registrado!')
            return res.status(400).json({ msg: error.message })

        }


        const token = generarJWT(generarId())
        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(password, salt)

        const agregarUsuario = await connection.query(
            `INSERT INTO user (email, password,  createdAt, updatedAt, verified, token) 
            VALUES('${email}','${pass}', NOW(), NOW(), false, '${token}');`)

        const agregarWorker = await connection.query(
            `INSERT INTO worker ( userId, position, active, dateJoined, birthDate, emerPhone, name, firstLastName, secondLastName, phone, gender) 
            VALUES('${agregarUsuario.insertId}','${position}', true, '${dateJoined}','${birthDate}','${emerPhone}','${name}','${firstLastName}','${secondLastName}','${phone}','${gender}');`)

        res.json({ msg: "¡Usuario registrado con exito!" })

    } catch (error) {
        console.log(error)
    }
}

const mostrarWorkers = async (req, res) => {

    try {
        const connection = await conectarDB()
        const trabajadores = await connection.query('SELECT worker.id,`active`,worker.name, `firstLastName`, `secondLastName`,position.name AS puesto  FROM worker INNER JOIN position ON worker.position = position.id WHERE position.name = "Operador Creativo"')
        const subscriptions = await connection.query('SELECT * FROM subscription')

        const data = [trabajadores, subscriptions]

        res.json(data)


    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }

}


const registrarCliente = async (req, res) => {
    try {
        const { email, password, companyName, subscription, priority, workerInCharge } = req.body;
        const connection = await conectarDB()
        const [existeUsuario] = await connection.query(`SELECT COUNT(*) as usuario FROM user WHERE email = '${email}';`)

        if (existeUsuario.usuario != 0) {

            const error = new Error('Cliente ya registrado')
            return res.status(400).json({ msg: error.message })
        }



        const token = generarJWT(generarId())
        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(password, salt)

        const agregarUsuario = await connection.query(
            `INSERT INTO user (email, password,  createdAt, updatedAt, verified, token) 
            VALUES('${email}','${pass}', NOW(), NOW(), false, '${token}');`)

        const agregarClient = await connection.query(
            `INSERT INTO client (id, companyName, active, subscription, priority, workerInCharge, userId)
            VALUES (NULL, '${companyName}', '1', '${subscription}', '${priority}', '${workerInCharge}', '${agregarUsuario.insertId}');`)

        res.json({ msg: "¡Cliente registrado con exito!" })

    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

const obtenerTrabajadores = async (req, res) => {

    try {
        const connection = await conectarDB()
        const trabajadores = await connection.query('SELECT worker.id,`active`, `dateJoined`, `birthDate`, `emerPhone`, worker.name,user.id AS userId, `firstLastName`, `secondLastName`, `phone`, `gender`, position.name AS puesto, user.email  FROM worker INNER JOIN position INNER JOIN user ON worker.position = position.id WHERE worker.userId = user.id')

        const tickets = 
        await connection.query(`SELECT ticket.id, ticket.deadline,ticket.activitie, ticketpurpose.name AS 'ticketPurposeName', state.type AS 'state', client.companyName, worker_inCharge.name AS 'worker_inChargeName', worker_inCharge.firstLastName AS 'worker_inChargeFLN', worker_inCharge.secondLastName AS 'worker_inChargeSLN', worker_support.name AS 'worker_supportName', worker_support.firstLastName AS 'worker_supportFLN', worker_support.secondLastName AS 'worker_supportSLN',  worker_ticketCreator.name AS 'worker_ticketCreatorName',  worker_ticketCreator.firstLastName AS 'worker_ticketCreatorFLN',  worker_ticketCreator.secondLastName AS 'worker_ticketCreatorSLN'
        FROM ticket
        INNER JOIN ticketworker ON ticketworker.ticket = ticket.id
        INNER JOIN worker AS worker_inCharge ON ticketworker.inCharge = worker_inCharge.id 
        INNER JOIN worker AS worker_support ON ticketworker.support = worker_support.id
        INNER JOIN worker AS worker_ticketCreator ON ticketworker.ticketCreator = worker_ticketCreator.id 
        INNER JOIN originpetition ON ticket.originPetition = originpetition.id
        INNER JOIN ticketpurpose ON ticket.ticketPurpose = ticketpurpose.id
        INNER JOIN state ON ticket.state = state.id
        INNER JOIN client ON ticket.clientId = client.id`);
        const data = [trabajadores, tickets]
        res.json(data)


    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }

}

const obtenerUsuarios = async (req, res) => {

    try {
        const connection = await conectarDB()
        const usuarios = await connection.query(`SELECT * FROM user;`)
        res.json(usuarios)
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }

}

const obtenerClientes = async (req, res) => {

    try {
        const connection = await conectarDB()
        const clientes = await connection.query('SELECT client.id,`companyName`, client.active,`priority`, worker.name, worker.firstLastName, worker.secondLastName, worker.gender, subscription.name AS susbcription, user.id AS userId FROM client INNER JOIN worker INNER JOIN subscription INNER JOIN user ON client.workerInCharge = worker.id AND client.subscription = subscription.id AND client.userId = user.id ORDER BY priority')
        res.json(clientes)
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }

}

const obtenerCliente = async (req, res) => {

    try {
        const { userId } = req.params
        const connection = await conectarDB()
        const cliente = await connection.query(`SELECT client.id,client.companyName, user.email, client.active,client.priority, worker.name, worker.firstLastName, worker.secondLastName, subscription.name AS susbcription FROM client INNER JOIN worker INNER JOIN subscription INNER JOIN user ON client.workerInCharge = worker.id AND client.subscription = subscription.id AND client.userId = user.id WHERE client.userId = '${userId}' ORDER BY id`)
        const trabajadores = await connection.query('SELECT worker.id,`active`,worker.name, `firstLastName`, `secondLastName`,position.name AS puesto  FROM worker INNER JOIN position ON worker.position = position.id WHERE position.name = "Operador Creativo"')
        const contactos = await connection.query(`SELECT contact.id AS contactId, contact.name, contact.firstLastName, contact.secondLastName, contact.active AS contactActive FROM contact INNER JOIN client ON contact.clientId = client.id WHERE client.userId='${userId}' AND contact.active='1' ORDER BY contact.id;`)
        const sucursales = await connection.query(`SELECT branchoffice.id AS branchId, branchoffice.address, branchoffice.phone, branchoffice.email, branchoffice.active, contact.name, contact.firstLastName, contact.secondLastName, contact.id AS contactId FROM branchoffice INNER JOIN client INNER JOIN contact ON branchoffice.clientId = client.id and branchoffice.inCharge = contact.id WHERE client.userId='${userId}' ORDER BY contact.id;`)
        const data=[cliente, trabajadores, contactos, sucursales]
        res.json(data)
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }

}
export const obtenerCliente2 = async (req, res) => {

    try {
        const { clientId } = req.params
        const connection = await conectarDB()
        const cliente = await connection.query(`SELECT client.id,client.companyName, user.email, client.active,client.priority, worker.name, worker.firstLastName, worker.secondLastName, subscription.name AS susbcription FROM client INNER JOIN worker INNER JOIN subscription INNER JOIN user ON client.workerInCharge = worker.id AND client.subscription = subscription.id AND client.userId = user.id WHERE client.id = '${clientId}' ORDER BY id`)
        const trabajadores = await connection.query('SELECT worker.id,`active`,worker.name, `firstLastName`, `secondLastName`,position.name AS puesto  FROM worker INNER JOIN position ON worker.position = position.id WHERE position.name = "Operador Creativo"')
        const contactos = await connection.query(`SELECT contact.id AS contactId, contact.name, contact.firstLastName, contact.secondLastName, contact.active AS contactActive FROM contact INNER JOIN client ON contact.clientId = client.id WHERE client.id='${clientId}' AND contact.active='1' ORDER BY contact.id;`)
        const sucursales = await connection.query(`SELECT branchoffice.id AS branchId, branchoffice.address, branchoffice.phone, branchoffice.email, branchoffice.active, contact.name, contact.firstLastName, contact.secondLastName, contact.id AS contactId FROM branchoffice INNER JOIN client INNER JOIN contact ON branchoffice.clientId = client.id and branchoffice.inCharge = contact.id WHERE client.id='${clientId}' ORDER BY contact.id;`)
        const data=[cliente, trabajadores, contactos, sucursales]
        res.json(data)
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }

}

const registrarContact = async (req, res) => {

    const { clientId, name, firstLastName, secondLastName, birthDate, active } = req.body;


    try {

        const connection = await conectarDB()

        const agregarContact = await connection.query(
            `INSERT INTO contact ( clientId, name, firstLastName, secondLastName, birthDate, active) 
            VALUES('${clientId}','${name}','${firstLastName}','${secondLastName}','${birthDate}','${active}');`)

        res.json({ msg: "¡Contracto registrado con exito!" })

    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

const registrarBranch = async (req, res) => {
    const { clientId, address, phone, email, inCharge, active } = req.body;
    try {
        const connection = await conectarDB()
        const [existeBranch] = await connection.query(`SELECT COUNT(*) as branch FROM branchoffice WHERE email = '${email}';`)

        if (existeBranch.usuario != 0) {

            const error = new Error('¡Esta sucursal ya ha sido registrada!')
            return res.status(400).json({ msg: error.message })

        }



        const agregarBranch = await connection.query(
            `INSERT INTO branchOffice ( clientId, address,  phone, email, inCharge, active) 
            VALUES('${clientId}','${address}','${phone}','${email}','${inCharge}','${active}');`)


        res.json({ msg: "¡Sucursal registrada con exito!" })

    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

export {
    registrarUsuario,
    mostrarWorkers,
    obtenerTrabajadores,
    obtenerUsuarios,
    registrarCliente,
    obtenerClientes,
    obtenerCliente,
    registrarContact,
    registrarBranch,
}