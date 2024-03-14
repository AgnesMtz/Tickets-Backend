import { conectarDB } from "../database/db.js";
import { transporter } from "./mail.js"
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarIdJWT.js";

import jwt from "jsonwebtoken";

// El que haga el registro copie estas dos lineas de abajo
import bcrypt from "bcrypt";
const saltRounds = 10;





export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Y esta tambien para que encripte la contraseña
        const passwordEncrypted = bcrypt.hashSync(password, saltRounds);
        console.log(passwordEncrypted)

        const connection = await conectarDB();

        const userRaw = await connection.query(`SELECT * FROM user WHERE email = '${email}'`);

        if (userRaw.length > 0) {
            const storedHashedPassword = userRaw[0].password;

            const passwordsMatch = bcrypt.compareSync(password, storedHashedPassword);

            if (passwordsMatch) {

                let typeUser = await connection.query(`SELECT COUNT(id) FROM client WHERE userId = ${userRaw[0].id}`);
                let rol = '';
                // console.log(typeUser[0]['COUNT(id)']);

                if(typeUser[0]['COUNT(id)'] > 0){
                    console.log("Es un cliente");
                    rol = '0';
                }
                else{
                    typeUser = await connection.query(`SELECT position FROM worker WHERE userId = ${userRaw[0].id}`);
                    rol = typeUser[0]['position'];
                }

                console.log(rol);
                console.log("Entro al sistema: " + email);

                //Generar el token
                const jwtToken = jwt.sign(
                    {
                        id: userRaw[0].id,
                        email: userRaw[0].email,
                    },
                    "FhightJPGalaxy" // Va a ser necesario cambiarlo por una variable de entorno
                );

                res.json({ message: "Bienvenido!", token: jwtToken, action: "success", rol: rol });
            } else {
                console.log("Passwords no coinciden: " + email);
                res.json({ message: "Usuario o contraseña incorrectos", action: "error" });
            }
        } else {
            console.log("Usuario NO encontrado " + email);
            res.json({ message: "Usuario o contraseña incorrectos", action: "error" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const validarToken = async (req, res) => {
    const { token } = req.params
    console.log(token)
    try {
        const connection = await conectarDB();
        const [existeToken] = await connection.query(`SELECT COUNT(*) as token FROM user WHERE token = '${token}';`);

        if (existeToken.token === 0) {
            const enviarError = new Error('Token no valido.');
            return res.status(404).json({ msg: enviarError.message });
        }

        return res.json({ msg: "Token valido." })

    } catch (error) {
        console.log(error)
    }
}

export const recoverPassword = async (req, res) => {
    const { email } = req.body;
    try {

        const connection = await conectarDB();
        const [existeUsuario] = await connection.query(`SELECT COUNT(*) as usuario FROM user WHERE email = '${email}';`);

        if (existeUsuario.usuario === 0) {
            const enviarError = new Error('Correo electrónico no registrado.');
            return res.status(404).json({ msg: enviarError.message });
        }

        const token = generarJWT(email);

        const jwtToken = jwt.sign(
            {
                email: email,
            },
            process.env.JWT_SECRET // Va a ser necesario cambiarlo por una variable de entorno
        );
        const nToken = jwtToken.toString().replace(/\./g, "");
        await connection.query(`UPDATE user SET token = '${nToken}' WHERE email = '${email}';`);
        const verificationlink = `http://localhost:5173/recover_password/${nToken}`
        const info = await transporter.sendMail({
            from: '"Restablecer contraseña" <gaytansgtickets@gmail.com>', // sender address
            to: email,
            subject: "Contraseña olvidada",
            html: `
                <b>Has solicitado reestablecer tu contraseña, tienes un lapso de 7 días ante de que expire el siguente link </b>
                <b>Porfavor da click en el siguiente link para reestablecer tu contraseña:</b>
                <a href=${verificationlink}>Porfavor da click en el siguiente link para reestablecer tu contraseña: ${verificationlink}</a>
            ` ,
        });


        return res.json({ msg: "La liga se ha enviado a tu correo electrónico." });

    } catch (error) {
        console.log(error);
        return res.status(522).json({ msg: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { password,token } = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(password, salt)
        
        const connection = await conectarDB();

        await connection.query(`UPDATE user SET password = '${pass}' WHERE token = '${token}';`);
        await connection.query(`UPDATE user SET token = '' WHERE token = '${token}';`);
        return res.json({ msg: "¡Exito! Tu contraseña ha sido actualizada" });


    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error.message })
    }
}
