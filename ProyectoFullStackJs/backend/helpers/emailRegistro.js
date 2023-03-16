import nodemailer from 'nodemailer';

const emailRegistro = async (datos) =>{
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
        subject: 'Comprueba tu cuenta en APV',
        text:'Comprueba tu cuenta en APV',
        html: `<p>Hola ${nombre}, comprueba tu cuenta en APV aquí </p>
               <p>Tu cuenta ya está lista sólo debes comprobarla  en el 
               siguiente enlace <a href="${process.env.FRONTED_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
               <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>
        `
    });


    console.log("Mensaje Enviado: %s",info.messageId);
}



export default emailRegistro;