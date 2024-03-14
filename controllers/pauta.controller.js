import { conectarDB } from "../database/db.js";
import xlsx from "node-xlsx";
import fs from "fs";
import path from "path";


const crearPauta = async (req, res) => {
    try {
        const { objetivo, tema, copy, dif, tipoContenido, plataforma, trabajador, nuevo, republicacion, disenoLink, idCliente, fecha} = req.body;
        const connection = await conectarDB()
        // console.log(req.body)
        const [existePauta] = await connection.query(`SELECT COUNT(*) as pauta FROM pauta WHERE clientId = '${idCliente}' AND active = '1';`)

        if (existePauta.pauta != 0) {
            const obtenerPauta = await connection.query(`SELECT id as id FROM pauta WHERE clientId = '${idCliente}' AND active = '1';`)

            const agregarTask = await connection.query(
                `INSERT INTO task (objetivo, tema, copy, dif, tipoContenido, plataforma, workerId, nuevo, republicacion, diseñoLink, pautaId, isDeleted) 
                VALUES('${objetivo}','${tema}','${copy}','${dif}','${tipoContenido}','${plataforma}','${trabajador}','${nuevo}','${republicacion}','${disenoLink}','${obtenerPauta[0].id}','0');`)
            
            const agregarFecha = await connection.query(
                    `INSERT INTO fechas ( taskId, fecha, pautaId, isDeleted)
                        VALUES('${agregarTask.insertId}','${fecha}', '${obtenerPauta[0].id}', 0);`)

            res.json({ msg: "¡Tarea creada!" })
        }

        else {
            const pauta = await connection.query(
                `INSERT INTO pauta ( active, approved, clientId, isDeleted) 
            VALUES('1','0','${idCliente}','0');`)


            const agregarTask = await connection.query(
                `INSERT INTO task (objetivo, tema, copy, dif, tipoContenido, plataforma, workerId, nuevo, republicacion, diseñoLink, pautaId, isDeleted) 
            VALUES(NOW(),'${objetivo}','${tema}','${copy}','${dif}','${tipoContenido}','${plataforma}','${trabajador}','${nuevo}','${republicacion}','${disenoLink}','${pauta.insertId}','0');`)

            const agregarFecha = await connection.query(
                `INSERT INTO fechas ( taskId, fecha, pautaId, isDeleted)
                    VALUES('${agregarTask.insertId}','${fecha}', '${pauta.insertId}', 0);`)

            res.json({ msg: "¡Pauta creada!" })
        }




    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

const crearPautaExcel = async (req, res) => {

    try {
        const connection = await conectarDB()
        const pauta = req.file;
        const clientId = req.params.id;

        const extension = path.extname(pauta.originalname);
        console.log(extension)
        if (extension != ".xlsx") {
            console.log("Archivo invalido")
            res.json({ msg: "El archivo no tiene el formato valido, solamente archivos .xlsx" })
        }

        const sheets = xlsx.parse(fs.readFileSync('./data/excel/' + pauta.originalname.toString()));
        var pautaId;
        const [existePauta] = await connection.query(`SELECT COUNT(*) as pauta FROM pauta WHERE clientId = '${clientId}' AND active = '1';`)
        if (existePauta.pauta == 0) {
            const crearPauta = await connection.query(
                `INSERT INTO pauta ( active, approved, clientId, isDeleted) 
                   VALUES('1','0','${clientId}','0');`)
            console.log("Creo pauta")
            pautaId = crearPauta.insertId;
        }
        else {
            const obtenerPauta = await connection.query(`SELECT id as id FROM pauta WHERE clientId = '${clientId}' AND active = '1';`)
            pautaId = obtenerPauta[0].id;
            console.log("La pauta ya existia")
        }

        let rows = sheets[4].data;
        //Aqui inicia todo el procedimiento para extraer las fechas
        //Primero checamos en que casilla se encuentra la fecha, si es en la segunda o tercer casilla
        let y = rows[1][0].toString();
        let fechasSeparadas = [];
        let fecha="";
        let fechas;
        let tipo;
        //Si es la segunda ejecutamos el if si es la tercera es el else
        if (y == "MES" || y == "mes" || y == "Mes") {
            for (let x = 2; x < rows.length; x++, fecha="",fechasSeparadas = []) {
                if (rows[x] != "") {

                    //Guardamos el valor de la fecha en llave
                     fechas = rows[x][2].toString();
                    //Checamos si la llave tiene una diagonal, si la tiene es que es una cadena de multiples fechas
                    if(fechas.includes('/')){
                        fechasSeparadas = separarFechas(fechas);
                        tipo = 1;
                    }
                    //Si no tiene diagonas significa que es una unica fecha dada en un valor numerico
                    else{
                        //Este metodo de conversion sepa porque funciona pero funciona
                        fecha = new Date((fechas - (25567 + 2)) * 86400 * 1000);
                        fecha = fecha.toString()
                        fecha = generarFecha(fecha);
                        tipo = 0;
                    }
                    
                    
                    console.log(rows[x][7])
                    var nuevo;
                    if (rows[x][7].toString()) nuevo = rows[x][7].toString();

                    console.log("El nuevo del if: " + nuevo)
                    var val = 0;
                    var val2 = 0;
                    if (nuevo == "true") val = 1;
                    else val2 = 1;

                    const agregarTask = await connection.query(
                        `INSERT INTO task (objetivo, tema, copy, dif, nuevo, republicacion, diseñoLink, tipoContenido, plataforma, workerId, pautaId, isDeleted) 
                               VALUES('${rows[x][3]}','${rows[x][4]}','${rows[x][5]}','${rows[x][6]}','${val}','${val2}','${rows[x][9]}','${rows[x][10]}','${rows[x][11]}','8','${pautaId}','0');`)

                    if(tipo = 0){
                        const agregarFecha = await connection.query(
                            `INSERT INTO fechas ( taskId, fecha, pautaId, isDeleted)
                            VALUES('${agregarTask.insertId}','${fecha}', '${pautaId}', 0);`)
                            
                    }
                    else{
                        for(let y=0;y<fechasSeparadas.length;y++){
                           await connection.query(
                                `INSERT INTO fechas ( taskId, fecha, pautaId, isDeleted)
                                VALUES('${agregarTask.insertId}','${fechasSeparadas[y]}','${pautaId}', 0);`)
                                console.log(fechasSeparadas[y]);
                            
                        }
                    }
                }
                fecha="";
            }
        } else {
            for (let x = 2; x < rows.length; x++,fecha="",fechasSeparadas = []) {
                if (rows[x] != "") {

                   //Guardamos el valor de la fecha en llave
                   fechas = rows[x][1].toString();
                   //Checamos si la llave tiene una diagonal, si la tiene es que es una cadena de multiples fechas
                   if(fechas.includes('/')){
                       fechasSeparadas = separarFechas(fechas);
                       console.log("Ya se separaron las fechas")
                       tipo = 1;
                   }
                   //Si no tiene diagonas significa que es una unica fecha dada en un valor numerico
                   else{
                       fecha = new Date((fechas - (25567 + 2)) * 86400 * 1000);
                       fecha = fecha.toString()
                       fecha = generarFecha(fecha);
                       tipo = 0;
                   }
                    
                    if (rows[x][6].toString()) var nuevo = rows[x][6].toString();

                    console.log(nuevo)
                    var val = 0;
                    var val2 = 0;
                    if (nuevo == "true") val = "1";
                    else val2 = "1";

                    const agregarTask = await connection.query(
                        `INSERT INTO task (objetivo, tema, copy, dif, nuevo, republicacion, diseñoLink, tipoContenido, plataforma, workerId, pautaId, isDeleted) 
                               VALUES('${rows[x][2]}','${rows[x][3]}','${rows[x][4]}','${rows[x][5]}','${val}','${val2}','${rows[x][8]}','${rows[x][9]}','${rows[x][10]}','8','${pautaId}','0');`)
                    console.log(tipo);

                    if(tipo == 1){
                        for(let y=0;y<fechasSeparadas.length;y++){
                            console.log("multiples fechas");
                            console.log(fechasSeparadas[y]);
                                await connection.query(
                                `INSERT INTO fechas ( taskId, fecha, pautaId , isDeleted)
                                    VALUES('${agregarTask.insertId}','${fechasSeparadas[y]}', '${pautaId}' , 0);`)
                                    console.log(fechasSeparadas[y]);
                                    
                        }
                    }

                    if(tipo == 0){
                        console.log("Entro a una fecha solita:" + fecha);
                        const agregarFecha = await connection.query(
                            `INSERT INTO fechas ( taskId, fecha, pautaId , isDeleted)
                                VALUES('${agregarTask.insertId}','${fecha}', '${pautaId}' , 0);`)
                                fecha="";
                    }             
                }
            }       
        }

        res.json({ msg: "¡Pauta creada!" })
    } catch (error) {
        return res.status(400).json({ msg: "¡Hay un error dentro del formato del documento!" });
    }
};

function separarFechas(cadenaFechas) {
    const fechas = [];
    const regex = /(\d{2}\/\d{2}\/\d{4})/g;
    let match;
    let i=0;
    while ((match = regex.exec(cadenaFechas)) !== null) {
      const [fechaCompleta] = match;
      const [dia, mes, anio] = fechaCompleta.split('/');
       fechas[i] = (dia+"/"+mes+"/"+anio).toString();
       console.log(fechas[i]);
        i++;
    }
    return fechas;
}

function generarFecha(fecha2) {
    let año = fecha2.substring(11, 15);
    let mes = fecha2.substring(4, 7);
    let dia = fecha2.substring(8, 10);

    switch (mes) {
        case "Jan":
            console.log("Enero");
            mes = "01";
            break;
        case "Feb":
            console.log("Febrero");
            mes = "02";
            break;
        case "Mar":
            console.log("Marzo");
            mes = "03";
            break;
        case "Apr":
            console.log("Abril");
            mes = "04";
            break;
        case "May":
            console.log("Mayo");
            mes = "05";
            break;
        case "Jun":
            console.log("Junio");
            mes = "06";
            break;
        case "Jul":
            console.log("Julio");
            mes = "07";
            break;
        case "Aug":
            console.log("Agosto");
            mes = "08";
            break;
        case "Sep":
            console.log("Septiembre");
            mes = "09";
            break;
        case "Oct":
            console.log("Octubre");
            mes = "10";
            break;
        case "Nov":
            console.log("Noviembre");
            mes = "11";
            break;
        case "Dec":
            console.log("Diciembre");
            mes = "12";
            break;
        default:
            console.log("Mes no válido");
            return "0000-00-00";
    }
    return (fecha2 = año.toString() + "-" + mes.toString() + "-" + dia.toString());
}

export const mostrarTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const connection = await conectarDB()
        const task = await connection.query(`SELECT task.id AS taskId, task.objetivo, task.tema, task.copy, task.dif, task.tipoContenido, task.plataforma, task.workerId, task.ticketId, task.nuevo, task.republicacion, task.diseñoLink, client.companyName, worker.name, worker.firstLastName, worker.secondLastName FROM task INNER JOIN pauta INNER JOIN worker INNER JOIN client on task.pautaId = pauta.id AND task.workerId = worker.id AND pauta.clientId = client.id WHERE pauta.active = '1' AND task.id= '${taskId}' AND task.isDeleted = '0'`)
        res.json(task);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

const mostrarDatos = async (req, res) => {
    try {
        const connection = await conectarDB();
        const trabajadores = await connection.query(
            'SELECT worker.id,`active`,worker.name, `firstLastName`, `secondLastName`,position.name AS puesto  FROM worker INNER JOIN position ON worker.position = position.id WHERE position.name = "Operador Creativo"'
        );
        const clientes = await connection.query("SELECT `id`,`companyName` FROM client");

        const data = [trabajadores, clientes];

        res.json(data);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

const mostrarPautas = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const connection = await conectarDB();
        const pautas = await connection.query(`SELECT pauta.id AS pautaId,pauta.approved,pauta.active, task.id AS taskId, task.objetivo, task.tema, task.copy, task.dif, task.tipoContenido, task.plataforma, task.workerId, task.ticketId, task.nuevo, task.republicacion, task.diseñoLink, client.companyName, worker.name, worker.firstLastName, worker.secondLastName FROM task INNER JOIN pauta INNER JOIN worker INNER JOIN client on task.pautaId = pauta.id AND task.workerId = worker.id AND pauta.clientId = client.id WHERE pauta.active = '1' AND client.id= '${clienteId}' AND pauta.isDeleted = '0' AND task.isDeleted = '0'`);
        const fechas = await connection.query(`SELECT fechas.id, fechas.pautaId, fechas.fecha, task.id AS taskId FROM fechas INNER JOIN task on task.id = fechas.taskId WHERE fechas.isDeleted = '0'`);
        
        for (var i =0 ;i<pautas.length;i++) {
            var fecha = "";
            for (var x = 0; x <  fechas.length; x++){
                if(fechas[x].taskId == pautas[i].pautaId){
                    fecha =fecha + fechas[x].fecha + " ";
                }
            }
            pautas[i].fecha = fecha;
        }
        res.json(pautas);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

const editarTask = async (req, res) => {
    try {
        const { taskId } = req.params
        const { objetivo, tema, copy, dif, tipoContenido, plataforma, trabajador, nuevo, republicacion, disenoLink } = req.body;
        const connection = await conectarDB()

        const response = await connection.query(`UPDATE task SET objetivo = '${objetivo}', tema = '${tema}', copy= '${copy}',dif = '${dif}',tipoContenido= '${tipoContenido}',plataforma= '${plataforma}',workerId= '${trabajador}',nuevo = '${nuevo}',republicacion= '${republicacion}',diseñoLink= '${disenoLink}' WHERE task.id = '${taskId}';`);

        if (response.affectedRows === 0) return res.status(400).json({ msg: "Error: No se encontró ninguna tarea con ese ID." });

        res.json({ msg: "Tarea editada" });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

export const borrarTask = async (req, res) => {
    try {
        const { taskId } = req.params
        const connection = await conectarDB()

        const response = await connection.query(`UPDATE task SET isDeleted = '1' WHERE task.id = '${taskId}';`);

        if (response.affectedRows === 0) return res.status(400).json({ msg: "Error: No se encontró ninguna tarea con ese ID." });

        res.json({ msg: "Tarea eliminada" });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};


export const editarPauta = async (req, res) => {
    try {
        const { pautaId } = req.params
        const connection = await conectarDB()

        const pauta = await connection.query(`SELECT pauta.id AS pautaId,pauta.approved,pauta.active, task.id AS taskId, task.objetivo, task.tema, task.copy, task.dif, task.tipoContenido, task.plataforma, task.workerId, task.ticketId, task.nuevo, task.republicacion, task.diseñoLink,client.id AS 'clientId', client.companyName, worker.name, worker.firstLastName, worker.secondLastName FROM task INNER JOIN pauta INNER JOIN worker INNER JOIN client on task.pautaId = pauta.id AND task.workerId = worker.id AND pauta.clientId = client.id WHERE pauta.id= '${pautaId}' AND pauta.isDeleted = '0' AND task.isDeleted = '0'`);

        for (var i =0 ;i<pauta.length;i++) {
            //console.log("Entro vez: "+ i)
            const task = pauta[i]
            const id = task.taskId;
            const qry3 = await connection.query(`INSERT INTO ticket (id, clientId, petition, originPetition, deadline, priority, applicationDate, serverLocation, activitie, ticketPurpose, frequency, state, deliveryDate, notes, observations, corrections)
            VALUES (NULL, '${task.clientId}', '${task.objetivo}', '9', '2023-05-30', '4', '2023-05-18 23:45:33.000000', '${task.diseñoLink}', '${task.dif}', '34', '2', '9', '2023-05-18 23:45:33.000000', 'Debe verse bien bonito', 'No mas de 50 palabras', 'Nada')`);

            const editTask = await connection.query(`UPDATE task SET ticketId= '${qry3.insertId}' WHERE task.id = '${id}';`);
            if (qry3.affectedRows === 0) console.log("No se han creado los tickets");
            
            const qry4 = await connection.query(`INSERT INTO socialmedia (id, ticket, facebook, instagram, whatsapp, linkedIn, tiktok, blog) VALUES (NULL, '${qry3.insertId}', '0', '1', '1', '0', '0', '1');`);

        }

        const response = await connection.query(`UPDATE pauta SET active = 0 WHERE id = '${pautaId}';`);

        if (response.affectedRows === 0) return res.status(400).json({ msg: "Error: No se encontró ninguna pauta con ese ID." });

        res.json({ msg: "¡Pauta terminada!" });
    } catch (error) {
        //return res.status(400).json({ msg: error.message });
        console.log(error)
    }
};

export const borrarPauta = async (req, res) => {
    try {
        const { pautaId } = req.params
        const connection = await conectarDB()

        const response = await connection.query(`UPDATE pauta SET isDeleted = '1' WHERE id = '${pautaId}';`);

        if (response.affectedRows === 0) return res.status(400).json({ msg: "Error: No se encontró ninguna pauta con ese ID." });

        res.json({ msg: "¡Pauta terminada!" });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

export const autorizarPauta = async (req, res) => {
    try {
        const { pautaId } = req.body;
        const connection = await conectarDB();

        if (!pautaId) {
            return res.status(400).json({ msg: "No se ha seleccionado ninguna pauta" });
        }

        const response = await connection.query(`UPDATE pauta SET approved = '1' WHERE id = '${pautaId}';`);

        if (response.affectedRows === 0) return res.status(400).json({ msg: "Error: No se encontró ninguna pauta con ese ID." });

        if (response.changedRows === 0) return res.status(200).json({ msg: "La pauta ya se encontraba autorizada." });

        res.json({ msg: "Pauta autorizada satisfactoriamente." });
    } catch (error) {
        // console.log(error);
        return res.status(400).json({ msg: "Error: Hubo un error al autorizar la pauta" });
    }
};

export {
    crearPauta,
    crearPautaExcel,
    mostrarDatos,
    mostrarPautas,
    editarTask
}
