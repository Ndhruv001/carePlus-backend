import { check } from "express-validator";

function userLoginValidationRules() {
  return [
    check("email")
      .isString()
      .withMessage("Email should be a string.")
      .notEmpty()
      .withMessage("Email should be a non-empty string.")
      .isEmail()
      .withMessage("Invalid email address."),

    check("password")
      .isString()
      .withMessage("Password should be a string.")
      .notEmpty()
      .withMessage("Password should be a non-empty string."),
  ];
}

export { userLoginValidationRules };
