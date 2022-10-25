const jwt = require('jsonwebtoken');

const generateJWTOrganizer = (name, email, document, tel, phone, referenciaU, referenciaZ, id) => {
  return new Promise((resolve, reject) => {
    const payload = { name, phone, document, tel, email, referenciaU, referenciaZ, id };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED_ORGANIZER,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        }

        resolve(token);
      }
    );
  });
};

module.exports = { generateJWTOrganizer };
