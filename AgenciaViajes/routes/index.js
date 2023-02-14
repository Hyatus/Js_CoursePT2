import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // request -> envío // response -> Lo que responde
  //res.send('Hola Mundo');
  // res.json({
  //     id:1
  // });
  res.render('inicio',{
    pagina:'Inicio'
  });
  
});

router.get("/nosotros", (req, res) => {
  res.render('nosotros',{
    pagina:'Nosotros'
  });

});

router.get("/viajes", (req, res) => {
  res.render('viajes',{
    pagina:'Viajes'
  });
});

router.get("/testimoniales", (req, res) => {
  res.render('testimoniales',{
    pagina:'Testimoniales'
  });
});


export default router;