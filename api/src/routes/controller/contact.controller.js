const { Router } = require('express');
const { contact } = require('../services/contact.service.js');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const contacto = req.body;
    const mail = await contact(contacto);
    return res.json({ msg: 'mensaje enviado con exito', response: mail.msg });
  } catch (error) {
    return res.json({ ERROR_CONTACT: error });
  }
});

module.exports = router;
