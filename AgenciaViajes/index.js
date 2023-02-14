import express from "express";
import router from "./routes/index.js";

const app = express();

//Definir puerto
const port = process.env.PORT || 4000;


// Habilitar PUG

app.set('view engine','pug');

// Obtener el año actual 
app.use((req,res,next)=>{

    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia Viajes";

    //console.log(res.locals);
    return next();
});

// Definir la carpeta pública 
app.use(express.static('public'));

// Agregar Router 
app.use('/',router);

app.listen(port, () => {
  console.log("El servidor está funcionando en el puerto: ", port);
});


