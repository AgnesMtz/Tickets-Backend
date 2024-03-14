import { conectarDB } from "../database/db.js";

// /api/user
// Para mandar todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const connection = await conectarDB();
        const rows = await connection.query(`SELECT * FROM user;`);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// /api/user/:id
// Para mandar un usuario en especifico
export const getUser = async (req, res) => {
    try {
        const connection = await conectarDB();
        const [user] = await connection.query(`SELECT * FROM user WHERE id = ${req.params.id}`);
        const [worker] = await connection.query(`SELECT * FROM worker WHERE userId = ${req.params.id}`);
        const [position] = await connection.query(`SELECT * FROM position WHERE id = ${worker.position}`);

        // console.log(worker)
        // Toda la informacion que se va a mandar
        const data2Send = {
            id: user.id,
            email: user.email,
            gender: worker.gender,
            name: worker.name,
            firstLastName: worker.firstLastName,
            secondLastName: worker.secondLastName,
            phone: worker.phone,
            position: position.name,
            active: worker.active,
            dateJoined: worker.dateJoined,
            birthDate: worker.birthDate,
            emerPhone: worker.emerPhone,
        };
        // console.log(data2Send);
        res.json([data2Send]);
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    //Falta hacer esta funcion
};

// /api/user/:id PUT
// Funcion que actualiza datos en tabla user y worker
export const updateUser = async (req, res) => {
    try {
        const connection = await conectarDB();
        var user, worker;

        const updateUser = {
            email: req.body.email,
            updatedAt: new Date(),
            verified: req.body.verified,
        };
        // console.log(updateUser);
        Object.keys(updateUser).forEach((key) => updateUser[key] === undefined && delete updateUser[key]);
        // console.log(updateUser);
        if (Object.keys(updateUser).length !== 1) {
            user = await connection.query(`UPDATE user SET ? WHERE id = ${req.params.id}`, [updateUser]);
        } else {
            user = { affectedRows: 0 };
        }
        // console.log(user);

        const updateWorker = {
            position: req.body.position,
            active: req.body.active,
            emerPhone: req.body.emerPhone,
            birthDate: req.body.birthDate,
            name: req.body.name,
            firstLastName: req.body.firstLastName,
            secondLastName: req.body.secondLastName,
            phone: req.body.phone,
            gender: req.body.gender,
        };
        Object.keys(updateWorker).forEach((key) => updateWorker[key] === undefined && delete updateWorker[key]);
        if (Object.keys(updateWorker).length !== 0) {
            worker = await connection.query(`UPDATE worker SET ? WHERE userId = ${req.params.id}`, [updateWorker]);
        } else {
            worker = { affectedRows: 0 };
        }
        // console.log(worker);

        res.json([user, worker]);
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    //Falta hacer esta funcion
};
