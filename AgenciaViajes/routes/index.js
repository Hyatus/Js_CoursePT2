import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // request -> envío // response -> Lo que responde
  //res.send('Hola Mundo');
  // res.json({
  //     id:1
  // });
  res.render('inicio');
  
});

router.get("/nosotros", (req, res) => {

  const viajes = 'Viaje a alemania';

  res.render('nosotros',{
    viajes
  });

});


export default router;