const { createTransport } = require('nodemailer');
require('dotenv').config();

const { EMAIL, PASSWORD } = process.env;

const sendEmailToReportOrganizer = async (
  titleReport,
  reasonToReport,
  dateToReport,
  name,
  email,
  title,
  enlace,
  image,
  nameOpinion,
  opinion
) => {
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
    subject: `Reportaron a una opinión`,
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
        font-size: 1.6rem;
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
        max-width: 60rem;
        text-align: center;
      }

      .top-bar,
      .bottom-bar {
        height: 3rem;
        background-color: #d53e27;
      }

      .container-info {
        padding: 4rem 2rem;
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

      .container-data {
      }

      .container-event {
      }

      .section-title {
        font-weight: bold;
        color: #d53e27;
        text-align: left;
      }

      .title-event {
        color: #1b3c6a;
        text-align: left;
      }

      .img-event {
        border-radius: 1rem;
        height: 20rem;
      }

      .container-user,
      .container-date,
      .container-opinion {
        text-align: left;
        color: #585858;
        margin-bottom: 1rem;
      }

      .container-user p,
      .container-date p,
      .container-opinion p {
        text-align: left;
      }
      .subtitle {
        font-weight: bold;
      }

      .container-date-user {
        gap: 2.4rem;
      }

      .enlace {
        display: block;
        text-align: center;
        margin-top: 2rem;
        padding: 1rem 2rem;
        background-color: #d53e27;
        color: #ffffff;
      }
    </style>
  </head>
  <body>
    <div class="container-main">
      <div class="container">
        <div class="top-bar"></div>
        <div class="container-info">
          <h1>Reporte de una opinión.</h1>

          <div class="container-data">
            <div class="container-event">
              <h2 class="title-event">${title}</h2>

              <img class="img-event" src="${image}" alt="${title}" />
            </div>

            <div class="container-date-user">
              <div class="container-user">
                <p class="section-title">Usuario que hizo el reporte:</p>

                <p><span class="subtitle">Nombre:</span> ${name}</p>

                <p><span class="subtitle">Correo:</span> ${email}</p>
              </div>

              <div class="container-opinion">
                <p class="section-title">Opinión reportada:</p>

                <p><span class="subtitle">Usuario:</span> ${nameOpinion}</p>
                <p><span class="subtitle">Opinión:</span> ${opinion}</p>
              </div>

              <div class="container-date">
                <p class="section-title">Detalles del reporte:</p>

                <p><span class="subtitle">Fecha:</span> ${dateToReport}</p>

                <p>
                  <span class="subtitle">Motivo de reporte:</span>
                  ${titleReport}
                </p>

                <p>
                  <span class="subtitle">Razón del reporte</span>
                  ${reasonToReport}
                </p>
                <a class="enlace" href="${enlace}">Ver opinión.</a>
              </div>
            </div>
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
  sendEmailToReportOrganizer,
};
