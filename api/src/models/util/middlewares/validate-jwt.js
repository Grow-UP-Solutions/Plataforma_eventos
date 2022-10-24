const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { uid, name, time } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
    req.time = time;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido',
    });
  }

  next();
};

module.exports = { validateJWT };
