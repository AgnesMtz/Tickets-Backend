import { conectarDB } from "../database/db.js";

// ticket CREATE
export const crearTicket = async (req, res) => {
    try {
        const connection = await conectarDB();

        //Se obtienen los datos del body para ingresar en la tabla Ticket
        const {
            client,
            levantaTicket,
            frequency,
            originPetition,
            priority,
            state,
            ticketPurpose,
            socialMedia,
            inCharge,
            support,
            values,
        } = req.body;
        const {
            petition,
            deadline,
            applicationDate,
            serverLocation,
            activitie,
            deliveryDate,
            notes,
            observations,
            corrections,
        } = values;

        // Se checa que el cliente exista
        const qry1 = await connection.query("SELECT * FROM client WHERE id = ?", [client]);
        if (qry1.length === 0) return res.status(400).json({ msg: "Error #413: El cliente no existe." });

        // Se checa el usuario que levanta el ticket
        const qry5 = await connection.query("SELECT w.* FROM user u JOIN worker w ON u.id = w.userId WHERE u.email = ?", [
            levantaTicket,
        ]);
        if (qry5.length === 0) return res.status(400).json({ msg: "Error #427: El usuario que levanta el ticket no existe." });
        const workerId = qry5[0].id;

        // Se hace lo de los dias
        var dias = {
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0,
            duration: 2,
        };
        frequency.forEach((dia) => {
            dias[dia.value] = 1;
        });
        const qry2 = await connection.query("INSERT INTO frequency SET ?", [dias]);
        if (qry2.affectedRows === 0)
            return res.status(400).json({ msg: "Error #430: Hubo un error al crear el ticket, intentalo mas tarde." });
        const frequencyId = qry2.insertId;

        // Se hace lo de social media
        var mediaSocial = {
            facebook: 0,
            instagram: 0,
            whatsapp: 0,
            linkedIn: 0,
            tiktok: 0,
            blog: 0,
        };
        socialMedia.forEach((media) => {
            mediaSocial[media.value] = 1;
        });

        //Se crea el objeto para ingresar en la tabla Ticket
        const data2ticket = {
            clientId: client,
            petition,
            originPetition,
            deadline,
            priority,
            applicationDate,
            serverLocation,
            activitie,
            ticketPurpose,
            frequency: frequencyId,
            state,
            deliveryDate,
            notes,
            observations,
            corrections,
        };
        const qry3 = await connection.query("INSERT INTO Ticket SET ?", [data2ticket]);
        if (qry3.affectedRows === 0) res.status(400).json({ msg: "Error #475: El ticket no pudo ser creado." });

        mediaSocial.ticket = qry3.insertId;
        const qry4 = await connection.query("INSERT INTO socialmedia SET ?", [mediaSocial]);
        if (qry4.affectedRows === 0) res.status(400).json({ msg: "Error #180: El ticket no pudo ser creado." });

        const ticketId = qry3.insertId;
        const qry8 = await connection.query("INSERT INTO ticketworker SET ?", [
            { ticket: ticketId, worker: workerId, ticketCreator: workerId, inCharge, support },
        ]);

        res.json({ msg: "Ticket creado satisfactoriamente." });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #460: Algo salio mal al crear el ticket." });
    }
};

// ticket READ
export const obtenerTicket = async (req, res) => {
    try {
        const connection = await conectarDB();
        const tickets = await connection.query(
            "SELECT * FROM ticket WHERE id = " +
            [req.params.ticketId]
        );

        if (tickets.length === 0) return res.status(400).json({ msg: "Error #490: El ticket no existe." });

        res.json(tickets[0]);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #496: Algo salio mal al obtener el ticket." });
    }
};

export const asignarTicket = async (req, res) => {
    try {
        const { worker, ticket, inCharge, support, ticketCreator } = req.body;

        const connection = await conectarDB();

        const ticketAsignado = {
            worker: worker,
            ticket: ticket,
            ticketCreator: ticketCreator,
            inCharge: inCharge,
            support: support,
        };

        var response = await connection.query("INSERT INTO ticketworker SET ?", [ticketAsignado]);

        if (response.affectedRows === 0) res.status(400).json({ msg: "Error #480: El ticket no pudo ser asignado." });

        console.log(response);
        res.json({ msg: "Ticket asignado satisfactoriamente." });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #486: Algo salio mal al asignar el ticket." });
    }
};

export const mostrarDatosTicket = async (req, res) => {
    try {
        const connection = await conectarDB();
        const trabajadores = await connection.query(
            'SELECT worker.id,worker.name, `firstLastName`, `secondLastName`,position.name AS puesto  FROM worker INNER JOIN position ON worker.position = position.id WHERE position.name = "Operador Creativo"'
        );
        const originPetition = await connection.query("SELECT originpetition.id, originpetition.name FROM originpetition");
        const priority = await connection.query("SELECT priority.id, priority.name FROM priority");
        const ticketpurpose = await connection.query("SELECT ticketpurpose.id, ticketpurpose.name FROM ticketpurpose");
        const state = await connection.query("SELECT state.id, state.type FROM state");
        const clients = await connection.query("SELECT client.id, client.companyName FROM client");

        const data = [trabajadores, originPetition, priority, ticketpurpose, state, clients];

        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #110: Algo salio mal al re-asignar el ticket." });
    }
};
export const cambiarAsignacionTicket = async (req, res) => {
    try {
        const { newWorker, oldWorker, ticket, inCharge, support } = req.body;

        const connection = await conectarDB();

        const ticketUpdate = {
            worker: newWorker,
            inCharge: inCharge,
            support: support,
        };

        var response = await connection.query("UPDATE ticketworker SET ? WHERE ticket = ? and worker = ?", [
            ticketUpdate,
            ticket,
            oldWorker,
        ]);

        console.log(response);
        if (response.affectedRows === 0) {
            res.status(400).json({ msg: "Error #114: El ticket no pudo ser re-asignado." });
        } else {
            res.json({ msg: "Ticket re-asignado satisfactoriamente." });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #110: Algo salio mal al re-asignar el ticket." });
    }
};

export const mostrarTodosTickets = async (req, res) => {
    try {
        const connection = await conectarDB();
        const todosTickets =
            await connection.query(`SELECT *
        FROM ticket
`);
        const estados = await connection.query(`SELECT state.id, state.type FROM state`);

        const data = [todosTickets, estados];
        res.json(data);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

export const mostrarMisTickets = async (req, res) => {
    try {
        const workerId = req.params.workerId;
        const connection = await conectarDB();
        const misTickets =
            await connection.query(`SELECT ticket.id, ticket.petition, ticket.deadline, ticket.activitie, ticket.deliveryDate, client.companyName
            FROM ticket
            INNER JOIN ticketworker ON ticketworker.ticket = ticket.id
            INNER JOIN client ON ticket.clientId = client.id
            WHERE ticketworker.worker = ${workerId}`);

        const data = [misTickets];
        res.json(data);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

export const mostrarMisTicketsCliente = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const connection = await conectarDB();
        const misTickets =
            await connection.query(`SELECT ticket.id, ticket.petition, ticket.deadline, ticket.activitie, ticket.deliveryDate, client.companyName
            FROM ticket
            INNER JOIN client ON ticket.clientId = client.id
            WHERE client.id = ${clientId}`);

        const data = [misTickets];
        res.json(data);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

export const ticketPrueba = async (req) => {
    try {
        const connection = await conectarDB();
        const ticket =
            await connection.query(`INSERT into tickets (clientId, petition, originPetition, deadline, priority, applicationDate, serverLocation, activitie, ticketPurpose, frequency, state, deliveryDate, notes, observations, corrections) 
        VALUES (7, 'Un segundo ticket', 2, '2023-05-08', 2, '2023-05-05', '2023-05-05 12:30:25', 'Mis archivos', 'Realizar un segundo ticket', 30, 1, 8, '2023-05-06', '2023-05-06 03:44:42', 'Ninguna nota', 'Ninguna observacion', 'Ninguna correccion')`);
        const ticketworker =
            await connection.query(`INSERT into ticketworker (worker, ticket, ticketCreator, inCharge, support) 
        VALUES (7, 3, 0, 1, 0)`);
        const data = "Todo correcto";
        res.json({ msg: data });
    } catch (error) {
        return res.status(400).json({ msg: "Algo salio mal" });
    }
};

export const mostrarTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const connection = await conectarDB();
        const unTicket =
            await connection.query(`SELECT ticket.id, ticket.petition, ticket.deadline, ticket.applicationDate, ticket.serverLocation, ticket.activitie, ticket.deliveryDate, ticket.notes, ticket.observations, ticket.corrections, priority.name AS 'PriorityName', originpetition.name AS 'originPetitionName', ticketpurpose.name AS 'ticketPurposeName', duration.type, state.type, client.companyName, worker_inCharge.name AS 'worker_inChargeName', worker_inCharge.firstLastName AS 'worker_inChargeFLN', worker_inCharge.secondLastName AS 'worker_inChargeSLN', worker_support.name AS 'worker_supportName', worker_support.firstLastName AS 'worker_supportFLN', worker_support.secondLastName AS 'worker_supportSLN',  worker_ticketCreator.name AS 'worker_ticketCreatorName',  worker_ticketCreator.firstLastName AS 'worker_ticketCreatorFLN',  worker_ticketCreator.secondLastName AS 'worker_ticketCreatorSLN'
            FROM ticket
            INNER JOIN ticketworker ON ticketworker.ticket = ticket.id
            INNER JOIN worker AS worker_inCharge ON ticketworker.inCharge = worker_inCharge.id 
            INNER JOIN worker AS worker_support ON ticketworker.support = worker_support.id
            INNER JOIN worker AS worker_ticketCreator ON ticketworker.ticketCreator = worker_ticketCreator.id 
            INNER JOIN priority ON ticket.priority = priority.id
            INNER JOIN originpetition ON ticket.originPetition = originpetition.id
            INNER JOIN ticketpurpose ON ticket.ticketPurpose = ticketpurpose.id
            INNER JOIN frequency ON ticket.frequency = frequency.id
            INNER JOIN duration ON frequency.duration = duration.id
            INNER JOIN state ON ticket.state = state.id
            INNER JOIN client ON ticket.clientId = client.id
            INNER JOIN socialmedia ON socialmedia.ticket = ticket.id
            WHERE ticket.id = ${ticketId};`);

        const frequency = await connection.query(`SELECT CASE frequency.monday WHEN 1 THEN 'Lunes' ELSE NULL END AS monday,
            CASE frequency.tuesday WHEN 1 THEN 'Martes' ELSE NULL END AS tuesday,
            CASE frequency.wednesday WHEN 1 THEN 'Miercoles' ELSE NULL END AS wednesday,
            CASE frequency.thursday WHEN 1 THEN 'Jueves' ELSE NULL END AS thursday,
            CASE frequency.friday WHEN 1 THEN 'Viernes' ELSE NULL END AS friday,
            CASE frequency.saturday WHEN 1 THEN 'Sabado' ELSE NULL END AS saturday,
            CASE frequency.sunday WHEN 1 THEN 'Domingo' ELSE NULL END AS sunday
            FROM ticket
            INNER JOIN frequency ON ticket.frequency = frequency.id
            WHERE ticket.id = ${ticketId}`);

        const socialMedia = await connection.query(`SELECT CASE socialmedia.facebook WHEN 1 THEN 'Facebook' ELSE NULL END AS facebook,
            CASE socialmedia.instagram WHEN 1 THEN 'Instagram' ELSE NULL END AS instagram,
            CASE socialmedia.whatsapp WHEN 1 THEN 'Whatsapp' ELSE NULL END AS whatsapp,
            CASE socialmedia.linkedIn WHEN 1 THEN 'LinkedIn' ELSE NULL END AS linkedIn,
            CASE socialmedia.tiktok WHEN 1 THEN 'Tik Tok' ELSE NULL END AS tiktok,
            CASE socialmedia.blog WHEN 1 THEN 'Blog' ELSE NULL END AS blog
            FROM socialmedia
            INNER JOIN ticket ON ticket.id = socialmedia.ticket
            WHERE ticket.id = ${ticketId}`);

        const trabajadores = await connection.query(
            'SELECT worker.id,worker.name, `firstLastName`, `secondLastName`,position.name AS puesto  FROM worker INNER JOIN position ON worker.position = position.id WHERE position.name = "Operador Creativo"'
        );
        const originPetition = await connection.query("SELECT originpetition.id, originpetition.name FROM originpetition");
        const priority = await connection.query("SELECT priority.id, priority.name FROM priority");
        const ticketpurpose = await connection.query("SELECT ticketpurpose.id, ticketpurpose.name FROM ticketpurpose");
        const state = await connection.query("SELECT state.id, state.type FROM state");

        const data = [unTicket, trabajadores, originPetition, priority, ticketpurpose, state, socialMedia, frequency];

        res.json(data);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};
export const subirTicket = async (req, res) => {
    try {
        const { copy } = req.body;
        const ticket = req.file;
        const ticketId = req.params.id;
        const ubicacionServer = "./data/image/" + ticket.originalname;
        const connection = await conectarDB();

        const response = await connection.query(`UPDATE ticket SET ticket.serverLocation = "${ubicacionServer}" WHERE ticket.id = ${ticketId}`);

        console.log(response);
        if (response.affectedRows === 0) {
            res.status(400).json({ msg: "Error #114: El ticket no pudo ser subido." });
        } else {
            res.json({ msg: "Ticket subido exitosamente." });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #110: Algo salio mal subir el ticket" });
    }
}

export const cambiarEstado = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const { stateId } = req.body;

        const connection = await conectarDB();

        var response = await connection.query(`UPDATE ticket SET ticket.state = ${stateId} WHERE ticket.id = ${ticketId}`);

        console.log(response);
        if (response.affectedRows === 0) {
            res.status(400).json({ msg: "Error #114: El estado del ticket no pudo ser cambiado." });
        } else {
            res.json({ msg: "El estado del ticket a sido cambiado satisfactoriamente." });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #110: Algo salio mal al cambiar el estado del ticket." });
    }
}

export const cambiarEstadoAprobado = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        const connection = await conectarDB();

        var response = await connection.query(`UPDATE ticket SET ticket.state = '4' WHERE ticket.id = ${ticketId}`);

        console.log(response);
        if (response.affectedRows === 0) {
            res.status(400).json({ msg: "Error #114: El estado del ticket no pudo ser cambiado." });
        } else {
            res.json({ msg: "El estado del ticket a sido cambiado satisfactoriamente." });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #110: Algo salio mal al cambiar el estado del ticket." });
    }
}

export const cambiarEstadoCancelado = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        const connection = await conectarDB();

        var response = await connection.query(`UPDATE ticket SET ticket.state = '10' WHERE ticket.id = ${ticketId}`);

        console.log(response);
        if (response.affectedRows === 0) {
            res.status(400).json({ msg: "Error #114: El estado del ticket no pudo ser cambiado." });
        } else {
            res.json({ msg: "El estado del ticket a sido cambiado satisfactoriamente." });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #110: Algo salio mal al cambiar el estado del ticket." });
    }
}

export const subirComentarios = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const { comentario } = req.body;

        const connection = await conectarDB();

        var response = await connection.query(`UPDATE ticket SET ticket.corrections = ${comentario} WHERE ticket.id = ${ticketId}`);

        console.log(response);
        if (response.affectedRows === 0) {
            res.status(400).json({ msg: "Error #114: El comentario no pudo ser cargado." });
        } else {
            res.json({ msg: "Comentarios subido exitosamente." });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Error #110: Algo salió mal al subir el comentario.' });
    }
};
