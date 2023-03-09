import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/Veterinario.js";


const registrar = async(req, res) => {
    const {email} = req.body;

    // Revisar si un usuario ya está registrado 

    const existeUsuario = await Veterinario.findOne({email});

    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try{
        // Guardar un nuevo veterinario 
        const veterinario = new Veterinario(req.body);
        // Bloqueamos porque no sabemos cuánto tiempo tomará en guardar
        // el registro 
        const veterinarioGuardado = await veterinario.save();
        
        res.json(veterinarioGuardado);
    }catch(error){
        console.log(error)

    }
};

const perfil = (req, res) => {

    const { veterinario } = req;

    res.json({perfil: veterinario});

};


const confirmar = async(req,res) => {
    const {token} = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token});

    if(!usuarioConfirmar){
        const error = new Error('Usuario no es válido');
        return res.status(400).json({msg: error.message});
    }

    try{
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({msg: 'Confirmando cuenta...'});
    }catch(error){
        console.log(error);
    }

}


const autenticar = async (req,res) =>{

    const {email, password} = req.body;

    // comprobar si el usuario existe 
    const usuarioExiste = await Veterinario.findOne({email});

    if(!usuarioExiste){
        const error = new Error("El usuario no existe");
        return res.status(403).json({msg: error.message});
    }
    
    // Comprobar si el usuario está confirmado o no
    if(!usuarioExiste.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({msg: error.message});
    }


    // Autenticar al usuario  -> Revisar Password
    if(await usuarioExiste.comprobarPassword(password)){
        // Autenticar
        res.json({token: generarJWT(usuarioExiste.id)});
        console.log('password correcto!')
    }else{
        const error = new Error("Password incorrecto");
        return res.status(403).json({msg: error.message});
    }
    
}

const olvidePassword = (req,res) =>{
    
}
 
const comprobarToken = (req,res) =>{

}
 
const nuevoPassword = (req,res) =>{

}
 
export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}