import { validationResult } from "express-validator";

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Input is not valid.",
      errors: errors.array(),
    });
  }
  next();
}

export { validate };
