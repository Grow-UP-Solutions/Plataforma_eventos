const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  console.log({ errors });

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Ingrese los datos correctamente',
    });
  }

  next();
};

module.exports = validateFields;
