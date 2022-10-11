const { createTransport } = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const { EMAIL, PASSWORD } = process.env;

export const changePasswordMail = async (email, link) => {
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
    to: email,
    subject: `Cambiar contraseña - Lo que quiero hacer`,
    html: `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
  
      <title>Document</title>
  
      <style>
        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
  
        html {
          font-size: 62.5%;
        }
  
        body {
          font-family: 'Raleway', sans-serif;
          color: #495057;
        }
  
        .container-body {
          display: grid;
          place-items: center;
        }
  
        .bar {
          display: block;
          height: 4.2rem;
          width: 100%;
          background-color: #ff922b;
        }
  
        .container-info {
          text-align: center;
  
          padding: 0 10rem;
        }
  
        h1 {
          font-size: 2.4rem;
          text-align: center;
          color: #495057;
          margin-bottom: 2rem;
        }
  
        p {
          text-align: start;
          font-size: 1.6rem;
          margin-bottom: 2.4rem;
          color: #495057;
        }
  
        .container-inputs {
          margin-bottom: 2.4rem;
        }
  
        a {
          display: block;
          text-align: start;
          font-size: 1.6rem;
          margin-bottom: 2.4rem;
        }
      </style>
    </head>
    <body class="container-body">
      <div class="bar"></div>
      <div class="container-info">
        <h1>Cambiar contraseña</h1>
        <p>Click al enlace para cambiar contraseña:</p>
  
        <a href="${link}">
          Click aquí
        </a>
  
        <p>Si no haz solicitado este correo no tienes de que preocuparte.</p>
      </div>
      <div class="bar"></div>
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
