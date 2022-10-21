const { createTransport } = require('nodemailer');
require('dotenv').config();;

const { EMAIL, PASSWORD } = process.env;

 const eventCreateMail = async (events, organizer) => {
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
    to: organizer.email,
    subject: `${organizer.firstName} ${organizer.lastName} tu evento ha sido publicado`,
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
        }
  
        .container-inputs {
          margin-bottom: 2.4rem;
        }
  
        .input {
          width: 5rem;
          height: 5rem;
  
          text-align: center;
          font-size: 2.4rem;
          color: #495057;
  
          border: 1px solid #495057;
          border-radius: 10px;
        }
      </style>
    </head>
    <body class="container-body">
      <div class="bar"></div>
      <div class="container-info">
        <h1>Confirmar correo</h1>
        <p>Código de verificación:</p>
  
        <div class="container-inputs">
          
        </div>
  
        <p>Si no haz solicitado este correo no tienes de que preocuparte.</p>
      </div>
      <div class="bar"></div>
    </body>
  </html>
  `
  };
  try {
    const response = await transporter.sendMail(mail_options);
    return { msg: ('SE ENVIO CON EXITO', response.response) };
  } catch (error) {
    return { msg: ('FALLO EL ENVIO DE EMAIL', error) };
  }
};
module.exports={
  eventCreateMail
}
