import React, {useState,useEffect} from 'react';
import {ciudades} from './funciones.js'


const Form = () => {

    // use del useState
    const [cuidad,setciudad] = useState([])
    const [nombre,setnombre] = useState("")
    const [lugar,setlugar] = useState("")
    const [valida,setValida] = useState(false)
    const [text,settext] = useState("")

    
    // useEffect para cargar todas las ciudades
   useEffect(() => {

       ciudades().then(res => setciudad(res))
       console.log("aa")

   },[])


   // funcion para valida que los campos esten completos
   const validacion = (e) => {
        const city = e.target.value
        setlugar(city)

        if (nombre) {
            setValida(true)
        } else {
            settext("Llenar campos")
        }
   }

  // funcion que cuando se de submit se va obtner los datos de nombre y lugar y se guarda en una variable como un objeto
   const envio = (e) => {
       e.preventDefault()

       const dato = {
           name:nombre,
           municipio:lugar
       }

       if (valida) {  // hacer true se envia la informacion a la base de datos

        fetch("http://localhost:9005/insertar",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(dato)
        }).then(res => res.text()).then(console.log)
        const formu = document.getElementById("formulario")
        formu.reset() // se resetea el formulario 
        setlugar("") // se restablece el valor por defecto del useState lugar
        setnombre("") // se restablece el valor por defecto del useState nombre
        setValida(false) // se cambia el valor a falso de valida para que no se envie mas hasta que llene los campos
        settext("se guardo en la base de datos") // mensaje que avisa que se guardo en la base de datos
        setTimeout(() => {
            settext("")  // settimeout para despues de 2 seg la etiqueta p no tenga ningun mensaje
        }, 2000);

       } else { // avisa que no se puede enviar por que los campos estan vacias cuando el active esta false
 
        settext("Llenar campos para poder enviar a la base de datos")
    
       }
   }

  
   // se hace un map para recorre la lista de objetos para mostrar en pantalla los valores que necesitamos de la cidades 
    const listado = cuidad.map(city => <option key={city.id_municipio} value={city.id_municipio}>{city.municipio} {city.departamento}</option>)
    
    return ( 
        <>
            <form className="form" onSubmit={envio} id="formulario">
                <label>Nombre Completo</label>
                <input type="text" placeholder="Ingresar nombre completo" onChange={(e) => setnombre(e.target.value)} />
                <label>Ciudades</label>
                <select onChange={validacion}>
                    <option value="">Seleccione una opcion </option>
                    {listado} 
                </select>
                <button type="submit" >Enviar</button>
                <p>{text}</p>

            
            </form>
        </>
    );
}
 
export default Form;