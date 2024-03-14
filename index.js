import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import { conectarDB } from "./database/db.js";

//Rutas de la base de datos
import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import pautaRoutes from "./routes/pauta.routes.js";
import branchOfficeRoutes from "./routes/branchOffice.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";

const app = express();
app.use(express.json());

conectarDB();
app.use(
    //Si no se agrega no deja entrar al api
    cors({
        origin: process.env.FRONTEND_URL, //Para especificar quienes se pueden conectar al API
    })
);

//Agregar al .env la variable FRONTEND_URL donde les corra el frontend
// const whitelist = [process.env.FRONTEND_URL]

// const corsOptions = {
//     origin: function(origin, callback){
//         if(whitelist.includes(origin)){
//             //Puede consultar la API
//             callback(null, true)
//         }else{
//             //No esta permitido
//             callback(new Error("Error de Cors"))
//         }
//     }
// }

// app.use(cors(corsOptions))

// dotenv.config()

//Para que se usen los archivos de rutas
app.use(indexRoutes);
app.use(authRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/cliente", clienteRoutes);
app.use("/api/ticket", pautaRoutes);
app.use("/api/branchOffice", branchOfficeRoutes);

//Se crea la variable PORT para que sea usada en produccion, esa variable se crea automaticamente, en dado caso que estemos en local se asigna el puerto 4000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`);
});
