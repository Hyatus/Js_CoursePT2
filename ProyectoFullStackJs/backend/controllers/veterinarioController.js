import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/Veterinario.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
  const { email, nombre} = req.body;

  // Revisar si un usuario ya está registrado

  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Guardar un nuevo veterinario
    const veterinario = new Veterinario(req.body);
    // Bloqueamos porque no sabemos cuánto tiempo tomará en guardar
    // el registro
    const veterinarioGuardado = await veterinario.save();


    // Enviamos el Email
    emailRegistro({
      email,
      nombre,
      token: veterinarioGuardado.token
    });

    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  const { veterinario } = req;

  res.json(veterinario);
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Veterinario.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Usuario no es válido");
    return res.status(400).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Confirmando cuenta..." });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // comprobar si el usuario existe
  const usuarioExiste = await Veterinario.findOne({ email });

  if (!usuarioExiste) {
    const error = new Error("El usuario no existe");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar si el usuario está confirmado o no
  if (!usuarioExiste.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Autenticar al usuario  -> Revisar Password
  if (await usuarioExiste.comprobarPassword(password)) {
    // Autenticar
    //usuarioExiste.token = generarJWT(usuarioExiste.id);

    res.json({
      _id: usuarioExiste._id,
      nombre: usuarioExiste.nombre,
      email: usuarioExiste.email,
      token: generarJWT(usuarioExiste.id),
    });

    console.log("password correcto!");
  } else {
    const error = new Error("Password incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeVeterinario = await Veterinario.findOne({ email });

  if (!existeVeterinario) {
    const error = new Error("No existe este usuario");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeVeterinario.token = generarId();

    await existeVeterinario.save();

    // Enviar email con instrucciones 

    emailOlvidePassword({
      email,
      nombre: existeVeterinario.nombre,
      token: existeVeterinario.token
    })

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Veterinario.findOne({ token });

  if (tokenValido) {
    // EL TOKEN ES VALIDO EL USUARIO EXISTE
    return res.status(200).json({ msg: "Token válido y el usuario existe" });
  } else {
    const error = new Error("El token es inválido");
    return res.status(400).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;

  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });

  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ msg: "Password actualizado con éxito! " });
  } catch (error) {
    console.log(error);
  }
};


const actualizarPerfil = async (req,res) =>{
  const veterinario = await Veterinario.findById(req.params.id);
  if(!veterinario){
    const error = new Error('Hubo un error');
    return res.status(400).json({msg: error.message});
  }

  const {email} = req.body;

  if(veterinario.email !== req.body.email){
    // Comprobamos que no utilice un email repetido 
    const existeEmail = await Veterinario.findOne({email})
    if(existeEmail){
      const error = new Error('Email ya existente, utilice otro');
      return res.status(400).json({msg: error.message});
    }
  }

  try {
    // Si no hay un nombre entonces que le asigne el nombre que ya tenía en la base de datos
    veterinario.nombre = req.body.nombre || veterinario.nombre;
    veterinario.email = req.body.email || veterinario.email;
    veterinario.web = req.body.web || veterinario.web;
    veterinario.telefono = req.body.telefono || veterinario.telefono;

    const veterinarioActualizado = await veterinario.save();

    // Con este dato vamos a actualizar el State de Auth
    res.json(veterinarioActualizado);

  } catch (error) {
    console.log(error);
  }

}


const actualizarPassword = async (req, res) => {
   //console.log(req.veterinario)
   //console.log(req.body)

   // Leer los datos
   const {id} = req.veterinario;
   const {pwd_actual, pwd_nuevo} = req.body;


   // Comprobar que el veterinario exista
   const veterinario = await Veterinario.findById(id);
    if(!veterinario){
    const error = new Error('Hubo un error');
    return res.status(400).json({msg: error.message});
  }

   // Comprobar nuevo password
    if(await veterinario.comprobarPassword(pwd_actual)){
        // Almacenar nueevo password
        veterinario.password = pwd_nuevo;
        await veterinario.save();

        res.json({msg:'Contraseña actualizada correctamente'});

    }else{
      const error = new Error('Contraseña actual incorrecta');
      return res.status(400).json({msg: error.message});
    }

  
}

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword
};



