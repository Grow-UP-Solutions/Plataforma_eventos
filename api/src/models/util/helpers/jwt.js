const jwt = require('jsonwebtoken');

const generateJWT = (uid, name, time) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, time };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: time,
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

module.exports = { generateJWT };
