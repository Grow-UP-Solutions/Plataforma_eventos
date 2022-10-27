const { createTransport } = require('nodemailer');
require('dotenv').config();

const { EMAIL, PASSWORD } = process.env;

const sendMailToOrganizer = async (name, link, email) => {
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
    subject: `Solicitud para ser Organizador, ${name}`,
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
            background-color: #d53e27;
          }
    
          .container-info {
            padding: 4rem 2rem;
    
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
    
          h1 {
            color: #1b3c6a;
          }
    
          h1 span {
            color: #d53e27;
          }
    
          .btnSuccess {
            display: block;
            padding: 1rem 4rem;
            border: none;
            border-radius: 20px;
            font-size: 1.4rem;
            font-weight: bold;
            box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            color: #ffffff;
            background-color: #d53e27;
          }
        </style>
      </head>
      <body>
        <div class="container-main">
          <div class="container">
            <div class="top-bar"></div>
            <div class="container-info">
              <h1>El usuario <span>${name}</span> quiere convertirse en organizador.</h1>
              <a href="${link}" class="btnSuccess">Visualizar sus datos</a>
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
  sendMailToOrganizer,
};
