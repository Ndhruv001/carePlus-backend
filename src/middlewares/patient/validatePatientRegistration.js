import { check } from "express-validator";

function patientRegistrationValidationRules() {
  return [
    // Name must be a non-empty string
    check("name")
      .isString()
      .withMessage("Name should be a string.")
      .notEmpty()
      .withMessage("Name should be a non-empty string.")
      .isLength({ max: 100 })
      .withMessage("Name must be less than 100 characters."),

    // Email must be a valid email and a non-empty string
    check("email")
      .isString()
      .withMessage("Email should be a string.")
      .notEmpty()
      .withMessage("Email should be a non-empty string.")
      .isEmail()
      .withMessage("Invalid email address.")
      .isLength({ max: 100 })
      .withMessage("Email must be less than 100 characters."),

    // password must be a non empty string
    check("password")
      .isString()
      .withMessage("Password should be a string.")
      .notEmpty()
      .withMessage("Password should be a non-empty string.")
      .isLength({ max: 65 })
      .withMessage("Password must be less than 65 characters."),

    // Date of Birth must be a valid date
    check("dob")
      .notEmpty()
      .withMessage("Date of Birth is required.")
      .isISO8601({ strict: true, strictSeparator: true })
      .withMessage("Date of Birth must be a valid date in YYYY-MM-DD format."),

    // Phone number must be a string and valid
    check("phone_number")
      .isString()
      .withMessage("Phone number should be a string.")
      .notEmpty()
      .withMessage("Phone number is required.")
      .isLength({ max: 15 })
      .withMessage("Phone number must be less than 15 characters.")
      .matches(/^[0-9\-+()\s]+$/)
      .withMessage("Invalid phone number format."),

    // Gender must be one of the allowed values
    check("gender")
      .isString()
      .withMessage("Gender should be a string.")
      .notEmpty()
      .withMessage("Gender is required.")
      .isIn(["Male", "Female", "Other"])
      .withMessage("Invalid gender."),

    // State is optional but if provided, must be a string
    check("state")
      .isString()
      .withMessage("State should be a string.")
      .isLength({ max: 100 })
      .withMessage("State must be less than 100 characters."),

    // City is optional but if provided, must be a string
    check("city")
      .isString()
      .withMessage("City should be a string.")
      .isLength({ max: 100 })
      .withMessage("City must be less than 100 characters."),

    // Emergency Contact Name is optional but if provided, must be a string
    check("emergency_contact_name")
      .isString()
      .withMessage("Emergency contact name should be a string.")
      .isLength({ max: 100 })
      .withMessage("Emergency contact name must be less than 100 characters."),

    // Emergency Contact Number is optional but if provided, must be a string and valid
    check("emergency_contact_number")
      .isString()
      .withMessage("Emergency contact number should be a string.")
      .isLength({ max: 15 })
      .withMessage("Emergency contact number must be less than 15 characters.")
      .matches(/^[0-9\-+()\s]+$/)
      .withMessage("Invalid emergency contact number format."),
  ];
}

export { patientRegistrationValidationRules };
