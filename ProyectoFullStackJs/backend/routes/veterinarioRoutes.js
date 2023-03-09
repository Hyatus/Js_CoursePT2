import express from "express";
import { registrar, 
        perfil, 
        confirmar, 
        autenticar, 
        olvidePassword,
        comprobarToken,
        nuevoPassword } from "../controllers/veterinarioController.js";
        
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

/* Rutas relacionadas a veterinarios (AREA PUBLICA) */
router.post("/", registrar);
// routing dinámico, colocamos :[nombre]
router.get('/confirmar/:token',confirmar);
// Vamos a enviar datos desde un formulario
router.post('/login',autenticar);
// pagina donde entro y coloco mi email -> revisamos que esté registrado
router.post('/olvide-password',olvidePassword)
// Leemos el token
router.get('olvide-password/:token',comprobarToken);
// usuario define su password nuevo y lo almacenamos
router.post('/olvide-password/:token',nuevoPassword);

// visito perfil abre el Middleware y luego va a perfil (AREA PRIVADA)
router.get("/perfil", checkAuth, perfil);

export default router;

