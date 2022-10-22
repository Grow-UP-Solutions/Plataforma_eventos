const { createTransport } = require('nodemailer');
require('dotenv').config();

const { EMAIL, PASSWORD } = process.env;

const sendMailToOrganizer = async (name, email, tel, phone, document, description) => {
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
    to: EMAIL,
    subject: `Solicitud para ser Organizador, Usuario Ux`,
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
        <link rel="stylesheet" href="styles.css" />
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
            font-family: 'Raleway', sans-serif;
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
            max-width: 50rem;
            text-align: center;
          }
    
          .top-bar,
          .bottom-bar {
            height: 3rem;
            background-color: var(--color-orange);
          }
    
          .container-info {
            padding: 4rem 2rem;
    
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
    
          h1 {
            color: var(--color-blue);
          }
    
          h1 span {
            color: var(--color-orange);
          }
    
          .container-buttons {
            display: flex;
            gap: 1.2rem;
            justify-content: center;
            align-items: center;
          }
    
          button {
            padding: 1rem 4rem;
            border: none;
            border-radius: 20px;
            font-size: 1.4rem;
            font-weight: bold;
            box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            color: white;
          }
    
          .btnSuccess {
            background-color: var(--color-orange);
          }
    
          .btnCancel {
            background-color: var(--color-grey-5);
          }
    
          .details-user {
            text-align: left;
          }
    
          .details-user ul {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
          }
    
          .details-user ul li {
            font-size: 1.4rem;
            color: var(--color-grey-1);
          }
    
          .details-user ul li span {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container-main">
          <div class="container">
            <div class="top-bar"></div>
            <div class="container-info">
              <h1>El usuario <span>Jean Pierre Huaman Gomez</span> quiere convertirse en organizador</h1>
    
              <div class="details-user">
                <ul>
                  <li><span>Correo:</span> jeanpipoxi@gmail.com</li>
                  <li><span>Celular:</span> 935797308</li>
                  <li><span>Télefono:</span> 33434341241</li>
                  <li><span>Cedula:</span> 72710575</li>
                  <li>
                    <span>Descripción del usuario:</span> Hola, soy organizador de eventos, yo me dedico a publicitar
                    eventos que tengan de temática videojuegos, deportes y salud mental jsjs.
                  </li>
                </ul>
              </div>
    
              <div class="container-buttons">
                <button class="btnSuccess">Aceptar</button>
                <button class="btnCancel">Rechazar</button>
              </div>
            </div>
            <div class="bottom-bar"></div>
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
  confirmacionCompra,
};
