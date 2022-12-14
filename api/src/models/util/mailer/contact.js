const { createTransport } = require('nodemailer');
require('dotenv').config();

const { EMAIL, PASSWORD } = process.env;

const enviar_mail_contact = async (name, email, tlf, msg) => {
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
    subject: `${name} quiere ser contactado`,
    html: `<table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
        <tr height="200px">
            <td bgcolor="d53e27" width="600px">
                <h1 style="color: #fff; text-align: center;">Nombre del usuario: ${name}</h1>
                <h1 style="color: #fff; text-align: center;">Email del usuario: ${email}</h1>
                <h1 style="color: #fff; text-align: center;">Telefono del usuario: ${tlf}</h1>
                <p style="color: #fff; text-align: center;"> ${msg} </p>
    
            </td>
        </tr>
    </table>`,
  };
  try {
    const response = await transporter.sendMail(mail_options);
    return { msg: ('SE ENVIO CON EXITO', response.response) };
  } catch (error) {
    return { msg: ('FALLO EL ENVIO DE EMAIL', error) };
  }
};
module.exports = {
  enviar_mail_contact,
};
