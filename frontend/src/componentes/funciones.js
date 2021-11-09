
export const ciudades = async () => {
    const dato = await  fetch("http://localhost:9005/ciudades")
    const respueta = await dato.json()
    return respueta
}

