import express from 'express';
import { agregarPaciente, 
        obtenerPacientes, 
        actualizarPaciente, 
        obtenerPaciente, 
        eliminarPaciente } from '../controllers/pacienteController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();


// El usuario debe estar autenticado tanto para agregar como para consultar pacientes
router.route('/')
      .post(checkAuth,agregarPaciente)
      .get(checkAuth,obtenerPacientes);


router.route('/:id')
      .get(checkAuth,obtenerPaciente)
      .put(checkAuth,actualizarPaciente)
      .delete(checkAuth,eliminarPaciente);


export default router;