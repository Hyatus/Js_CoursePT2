import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) =>{
    /* Credenciales para poder enviar el email **/
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    // Enviamos el email

    const {email, nombre, token} = datos;

    const info = await transporter.sendMail({
        from: 'APV - Administrador de pacientes de veterinaria',
        to: email,
        subject: 'Reestablece tu Password ',
        text:'Reestablece tu Password ',
        html: `<p>Hola ${nombre}, has solicitado reestablecer tu password </p>
               <p>Sigue el siguiente enlace para generar un nuevo password 
                <a href="${process.env.FRONTED_URL}/olvide-password/${token}">Reiniciar Contraseña</a></p>
               <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>
        `
    });


    console.log("Mensaje Enviado: %s",info.messageId);
}



export default emailOlvidePassword;