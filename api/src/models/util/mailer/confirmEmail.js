const { createTransport } = require("nodemailer");
const dotenv = require("dotenv").config();

const { EMAIL, PASSWORD } = process.env;

const sendVerifyMail = async (email, code) => {
  const transporter = createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  let mail_options = {
    from: "Lo quiero hacer",
    to: email,
    subject: `Confirmar Email - Lo que quiero hacer`,
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
          background-color: #d53e27;
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
          <input disabled value="${code[0]}" class="input" type="text" />
          <input disabled value="${code[1]}" class="input" type="text" />
          <input disabled value="${code[2]}" class="input" type="text" />
          <input disabled value="${code[3]}" class="input" type="text" />
          <input disabled value="${code[4]}" class="input" type="text" />
          <input disabled value="${code[5]}" class="input" type="text" />
        </div>
  
        <p>Si no haz solicitado este correo no tienes de que preocuparte.</p>
      </div>
      <div class="bar"></div>
    </body>
  </html>
  `,
  };
  try {
    const response = await transporter.sendMail(mail_options);
    return { msg: ("SE ENVIO CON EXITO", response.response) };
  } catch (error) {
    return { msg: ("FALLO EL ENVIO DE EMAIL", error) };
  }
};

module.exports = {
  sendVerifyMail,
};
