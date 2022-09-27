import  {enviar_mail_contact}  from "../../models/util/mailer/contact.js";

export async function contact(contacto) {
  const { name, email, tlf, msg } = contacto;
  const mail = await enviar_mail_contact(name, email, tlf, msg);
  return mail;
}
