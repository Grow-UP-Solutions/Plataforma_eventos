const jwt = require('jsonwebtoken');

const validateJWTOrganizer = (req, res, next) => {
  const token = req.header('x-token-organizer');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { name, phone, document, tel, email, description, image, id } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED_ORGANIZER
    );

    req.name = name;
    req.phone = phone;
    req.document = document;
    req.tel = tel;
    req.email = email;
    req.description = description;
    req.image = image;
    req.id = id;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido',
    });
  }

  next();
};

module.exports = { validateJWTOrganizer };
