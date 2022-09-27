import { validationResult } from 'express-validator';

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({
      errors: errors.mapped(),
    });
  }

  next();
};

export default validateFields;
