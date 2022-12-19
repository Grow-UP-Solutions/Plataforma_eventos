const { createTransport } = require('nodemailer');
require('dotenv').config();

const { EMAIL, PASSWORD } = process.env;

const fecha = new Date();
  const hora = fecha.getHours();
  const minutes = fecha.getMinutes();
  const dateActual = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

const eventCreateAdministrador = async (events, organizer) => {
  console.log('eventmail',events)
  console.log('organizer',organizer)
  const { title, _id, longDescription, idEvent, } = events;
  const transporter = createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  let mail_options = {
    from: 'Lo quiero hacer',
    to: process.env.MAIL_CLIENT,
    subject: `NUEVO - Publicado por ${organizer.firstName} ${organizer.lastName} REF: ${idEvent}`,
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <style>
          :root {
            --color-orange: #d53e27;
            --color-grey-1: #585858;
            --color-grey-2: #707070;
            --color-grey-3: #868686;
            --color-grey-4: #d6d6d6;
            --color-grey-5: #313131;
            --color-grey-6: #f4f4f4;
            --color-blue: #1b3c6a;
            --color-green: #29aa79;
          }
    
          *,
          *::after,
          *::before {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
    
          html {
            font-size: 62.5%;
            scroll-behavior: smooth;
          }
          body {
            font-family: "Raleway", sans-serif;
            font-weight: 400;
            line-height: 1;
          }
    
          img {
            max-width: 100%;
          }
    
          a {
            text-decoration: none;
            color: inherit;
          }
    
          ol,
          ul {
            list-style: none;
          }
    
          .container-main {
            display: grid;
            place-items: center;
            height: 100vh;
          }
    
          .container {
            width: 60rem;
          }
          .franja-top,
          .franja-bottom {
            display: block;
            height: 5rem;
            background-color: #d53e27;
          }
    
          .container-data {
            padding: 2rem;
    
            color: #585858;
            font-size: 1.4rem;
          }
    
          .container-data p {
            font-size: 1.4rem;
          }
          .event-name {
            color: #1b3c6a;
            font-weight: bold;
            font-size: 2.5rem;
          }
    
          .container-date {
          }
        </style>
      </head>
      <body>
        <div class="container-main">
          <div class="container">
            <div class="franja-top"></div>
            <div class="container-data">
              <h1>Evento creado</h1>
    
              <p>Hola, han creado un evento.</p>
    
              <a class="event-name" href="https://events-jean.vercel.app/detalles-del-evento/${_id}"
                >${title}</a
              >
              <p>
              Fecha de Creacion: ${dateActual}
             </p>
              <p>
              Hora de Creacion: ${hora}:${minutes}
              </p>
              <p>
               ${longDescription}
              </p>
    
              <div class="container-date">
                
              </div>
            </div>
    
            <div class="franja-bottom"></div>
          </div>
        </div>
      </body>
    </html>
  `,
  };
  try {
    const response = await transporter.sendMail(mail_options);
    return { msg: ('SE ENVIO CON EXITO', response.response) };
  } catch (error) {
    return { msg: ('FALLO EL ENVIO DE EMAIL', error) };
  }
};
module.exports = {
  eventCreateAdministrador,
};
