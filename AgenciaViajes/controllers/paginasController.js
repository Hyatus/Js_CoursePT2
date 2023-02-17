import {Viaje} from '../models/Viaje.js'

const paginaInicio = (req, res) => {
    // request -> envío // response -> Lo que responde
    //res.send('Hola Mundo');
    // res.json({
    //     id:1
    // });
    res.render('inicio',{
      pagina:'Inicio'
    });
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

const paginaTestimoniales = (req, res) => {
    res.render('testimoniales',{
      pagina:'Testimoniales'
    });
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