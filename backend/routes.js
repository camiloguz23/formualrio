import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv'

dotenv.config({path:'variables.env'})
const routes = express.Router()

const connection = mysql.createConnection({ // connection a la base de datos
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
})

routes.get("/ciudades",(req,res) => {  // ruta get para obtener las ciudades

    connection.query("SELECT id_municipio,municipio,departamentos.departamento FROM municipios LEFT JOIN departamentos on municipios.departamento_id=departamentos.id_departamento order by departamentos.departamento,municipio", function (error,dato) {

        if (error) {
            res.send(error)
        } else {
            res.json(dato)
            
        }
        
    })
})

routes.post("/insertar",(req,res) =>{ // ruta pata enviar los datos de la base de datos 

    connection.query(`insert into usuario (nombre,id_municipio) values (?,?)`,[req.body.name,req.body.municipio], function (error,dato) {

        if (error) {
            res.send(error)
        } else {
            res.send("se envio")
        }
    })
    
})

export default routes