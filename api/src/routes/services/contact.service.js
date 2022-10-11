const  {enviar_mail_contact}  =require("../../models/util/mailer/contact.js");

 async function contact(contacto) {
  const { name, email, tlf, msg } = contacto;
  const mail = await enviar_mail_contact(name, email, tlf, msg);
  return mail;
}
 module.exports={
  contact
 }