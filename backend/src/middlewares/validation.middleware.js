import { validationResult } from "express-validator";
import Joi from "joi";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
};

// New: validate request body using a Joi schema provided by models
export const validateSchema = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((d) => ({ field: d.path.join('.'), message: d.message })),
    });
  }

  // replace body with validated & sanitized value
  req.body = value;
  next();
};
