import Paciente from "../models/Paciente.js";

const agregarPaciente = async(req, res) => {
    console.log(req.body);

    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;

   try {    
       const pacienteGuardado = await paciente.save();

       res.json(pacienteGuardado);
    
   } catch (error) {
        console.log(error);
   }
}


const obtenerPacientes = async(req, res) => {
    // Nos va a arrojar todos los pacientes como un arreglo
    // Agregamos un where para traer los pacientes de un solo veterinario
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes);
}

const obtenerPaciente = async(req,res) =>{
    // obtiene de la url el id de cada paciente
   const {id} = req.params;

   const paciente = await Paciente.findById(id);

   if(!paciente){
    return res.status(404).json({msg: 'No existe este paciente'})
  }

   // Revisamos que el paciente esté asignado a este veterinario
   // Convertimos los objectId a String para que se pueda realizar correctamente la comparación
   if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
     return res.json({msg: 'Acción no válida'})
   }

    res.json(paciente);
   
}
const actualizarPaciente = async(req,res) =>{

  // obtiene de la url el id de cada paciente
  const {id} = req.params;

  const paciente = await Paciente.findById(id);

  if(!paciente){
    return res.status(404).json({msg: 'No existe este paciente'})
  }
  // Revisamos que el paciente esté asignado a este veterinario
  // Convertimos los objectId a String para que se pueda realizar correctamente la comparación
  if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    return res.json({msg: 'Acción no válida'})
  }

  // Actualizamos el paciente 
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);

  } catch (error) {
    console.log(error)
  }

}
const eliminarPaciente = async(req,res) =>{
  // obtiene de la url el id de cada paciente
  const {id} = req.params;

  const paciente = await Paciente.findById(id);

  if(!paciente){
    return res.status(404).json({msg: 'No existe este paciente'})
  }
  // Revisamos que el paciente esté asignado a este veterinario
  // Convertimos los objectId a String para que se pueda realizar correctamente la comparación
  if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    return res.json({msg: 'Acción no válida'})
  }

  // Eliminamos el paciente 
  try {
    await paciente.deleteOne();
    res.json({'msg':'Paciente eliminado correctamente'});
  } catch (error) {
    console.log(error)
  }

}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}