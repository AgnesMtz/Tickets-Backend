import { conectarDB } from "../database/db.js";

// /api/branchOffice
// Para mandar todos los usuarios
export const getBranchOffices = async (req, res) => {
    try {
        const connection = await conectarDB();
        const rows = await connection.query(`SELECT * FROM branchoffice;`);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// /api/branchOffice/:id
// Para mandar un branchOffice en especifico
export const getBranchOffice = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await conectarDB();
        const rows = await connection.query(`SELECT * FROM branchoffice WHERE id = ${id};`);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// /api/branchOffice  (POST)
// Para crear un branchOffice
export const createBranchOffice = async (req, res) => {
    try {
        const { clientId, address, phone, email, inCharge } = req.body;
        const connection = await conectarDB();
        const [existeBranch] = await connection.query(`SELECT COUNT(*) as branch FROM branchoffice WHERE email = '${email}';`);
        console.log(existeBranch);
        if (existeBranch.branch != 0) {
            const error = new Error("¡Esta sucursal ya ha sido registrada!");
            return res.status(400).json({ msg: error.message });
        }
        const [response] = await connection.query("SELECT * FROM client WHERE userId = ?", [clientId]);
        const agregarBranch = await connection.query(
            `INSERT INTO branchOffice ( clientId, address,  phone, email, inCharge, active) 
            VALUES('${response.id}','${address}','${phone}','${email}','${inCharge}',1);`
        );
        console.log(agregarBranch);
        res.json({ msg: "¡Sucursal registrada con exito!" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.message });
    }
};
