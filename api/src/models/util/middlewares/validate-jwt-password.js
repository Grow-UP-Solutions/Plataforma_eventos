const jwt = require('jsonwebtoken');

const validateJWTPassword = (req, res, next) => {
  const token = req.header('x-token-password');

  if (!token) {
    return res.status(401).json({
      message: 'No hay token de password en la petición',
    });
  }

  try {
    const { email } = jwt.verify(token, process.env.SECRET_JWT_SEED_MAIL);

    req.email = email;
  } catch (error) {
    return res.status(401).json({
      message: 'Token no valido',
    });
  }

  next();
};

module.exports = { validateJWTPassword };
