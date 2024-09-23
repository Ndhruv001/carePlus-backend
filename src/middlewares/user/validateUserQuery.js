import { check } from "express-validator";

function userQueryValidationRules() {
  return [
    check("name")
      .isString()
      .withMessage("Name should be a string.")
      .notEmpty()
      .withMessage("Name should be a non-empty string."),
    check("email")
      .isString()
      .withMessage("Email should be a string.")
      .notEmpty()
      .withMessage("Email should be a non-empty string.")
      .isEmail()
      .withMessage("Invalid email address."),
    check("message")
      .isString()
      .withMessage("Message should be a string.")
      .notEmpty()
      .withMessage("Message should be a non-empty string.")
      .isLength({ max: 250 })
      .withMessage("Message should be less than 250 characters."),
  ];
}

export { userQueryValidationRules };
