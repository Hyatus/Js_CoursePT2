import {Viaje} from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async(req, res) => {
    // request -> envío // response -> Lo que responde
    //res.send('Hola Mundo');
    // res.json({
    //     id:1
    // });

    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3}));

    try{

      const resultado = await Promise.all(promiseDB);

      res.render('inicio',{
        pagina:'Inicio',
        clase:'home',
        viajes: resultado[0],
        testimoniales: resultado[1]
      });
    }catch(e){
      console.log(e)
    }
}

const paginaNosotros =  (req, res) => {
    res.render('nosotros',{
      pagina:'Nosotros'
    });
  
}

const paginaViajes  = async(req, res) => {

    // Consultar base de datos
    const viajes = await Viaje.findAll(); // trae todos los datos de la tabla
    console.log(viajes);

    res.render('viajes',{
      pagina:'Próximos Viajes',
      viajes,
    });
  }

const paginaTestimoniales = async(req, res) => {
    try{
      const testimoniales = await Testimonial.findAll();

      res.render('testimoniales',{
        pagina:'Testimoniales',
        testimoniales
      });

    }catch(e){
      console.log(e);
    }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async(req,res) => {
   const {viaje} = req.params;
        
   try{
        const resultado = await Viaje.findOne({where: { slug: viaje }})
        res.render('viaje',{ 
            pagina: 'Información Viaje',
            resultado
        })
   }catch(e){
     console.log(e);
   }

}
 
export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}