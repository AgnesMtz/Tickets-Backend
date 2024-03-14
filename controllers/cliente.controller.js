import { conectarDB } from "../database/db.js";

export const verCliente = async (req, res) => {
    try {
        //Se obtiene el id del cliente
        const { id } = req.params;

        //Se crea la conexion a la base de datos
        const connection = await conectarDB();

        //Se ejecuta la consulta para obtener los datos del cliente
        const response1 = await connection.query("SELECT * FROM Client WHERE id = ?", [id]);

        if (response1.length === 0) {
            res.status(400).json({ msg: "Error #454: El cliente no existe." });
        } else {
            const client = response1[0];

            const response2 = await connection.query("SELECT * FROM BranchOffice WHERE clientId = ?", [id]);
            client.branchOffices = response2;

            const response3 = await connection.query("SELECT * FROM Contact WHERE clientId = ?", [id]);
            client.contacts = response3;
            res.json(client);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #460: Algo salio mal al obtener los clientes." });
    }
};

export const crearContacto = async (req, res) => {
    try {
        //Se obtiene el id del cliente
        const { clientId } = req.body;

        //Se crea la conexion a la base de datos
        const connection = await conectarDB();

        //Se ejecuta la consulta para obtener los datos del cliente
        console.log(clientId);
        const response1 = await connection.query("SELECT * FROM Client WHERE id = ?", [clientId]);
        console.log(response1);

        if (response1.length === 0) {
            res.status(400).json({ msg: "Error #454: El cliente no existe." });
        } else {
            const { name, firstLastName, secondLastName, birthDate } = req.body;

            const response2 = await connection.query(
                "INSERT INTO Contact (name, firstLastName, secondLastName, birthDate, clientId, active) VALUES (?, ?, ?, ?, ?, 1)",
                [name, firstLastName, secondLastName, birthDate, clientId]
            );

            res.json({ msg: "Contacto creado exitosamente." });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error #460: Algo salio mal al obtener los clientes." });
    }
};
