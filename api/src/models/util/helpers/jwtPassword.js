const jwt = require('jsonwebtoken');

const generateJWTPassword = (email) => {
  return new Promise((resolve, reject) => {
    const payload = { email };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED_MAIL,
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

module.exports = { generateJWTPassword };
