import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    telefono:{
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,
    },
    token:{
        type: String,
        default: generarId(),
    },
    confirmado:{
        type: Boolean,
        default: false,
    }
});

// Antes de almacenarlo en la base de datos
veterinarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        // Un password que ya está hasheado ya no lo vuelve a hacer
        next(); /* Va al siguiente Middleware */
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario,this.password);
}

const Veterinario = mongoose.model('Veterinario',veterinarioSchema);

export default Veterinario;
