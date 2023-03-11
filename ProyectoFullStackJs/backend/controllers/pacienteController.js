import Paciente from "../models/Paciente.js";

const agregarPaciente = async(req, res) => {
    console.log(req.body);

    const paciente = new Paciente(req.body);

   try {    

        console.log(req.veterinario._id)
        
   } catch (error) {
        console.log(error);
   }
}


const obtenerPacientes = (req, res) => {
    console.log(req.body);
}



export {
    agregarPaciente,
    obtenerPacientes
}