const { enviar_mail_contact } = require("../../models/mailer/contact");

module.exports = {
  contact: async function (contacto) {
    const { name, email, tlf, msg } = contacto;
    const mail= await enviar_mail_contact(name, email, tlf, msg);
    return mail
  },
};
