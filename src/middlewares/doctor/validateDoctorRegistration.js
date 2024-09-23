import { check } from "express-validator";

function doctorRegistrationValidationRules() {
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

    // Gender must be one of the allowed values
    check("gender")
      .isString()
      .withMessage("Gender should be a string.")
      .notEmpty()
      .withMessage("Gender is required.")
      .isIn(["Male", "Female", "Other"])
      .withMessage("Invalid gender."),

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

    // Specialization must be a non-empty string
    check("specialization")
      .isString()
      .withMessage("Specialization should be a string.")
      .notEmpty()
      .withMessage("Specialization is required.")
      .isLength({ max: 50 })
      .withMessage("Specialization must be less than 50 characters."),

    // Medical License Number must be a non-empty string
    check("medical_license_number")
      .isString()
      .withMessage("Medical license number should be a string.")
      .notEmpty()
      .withMessage("Medical license number is required.")
      .isLength({ max: 50 })
      .withMessage("Medical license number must be less than 50 characters."),

    // Years of Experience must be a non-empty string that represents a number
    check("experience")
      .isString()
      .withMessage("Years of experience should be a string.")
      .notEmpty()
      .withMessage("Years of experience is required.")
      .isLength({ max: 50 })
      .withMessage("Years of experience must be less than 50 characters."),

    // Certification is optional but if provided, must be a string
    check("certification")
      .optional()
      .isString()
      .withMessage("Certification should be a string.")
      .isLength({ max: 255 })
      .withMessage("Certification must be less than 255 characters."),

    // Education Detail must be a non-empty string
    check("education_detail")
      .isString()
      .withMessage("Education detail should be a string.")
      .notEmpty()
      .withMessage("Education detail is required.")
      .isLength({ max: 50 })
      .withMessage("Education detail must be less than 50 characters."),

    // Profile Picture is optional but if provided, must be a string and a valid URL
    check("profile_picture")
      .optional()
      .isString()
      .withMessage("Profile picture should be a string.")
      .isLength({ max: 255 })
      .withMessage("Profile picture URL must be less than 255 characters.")
      .isURL()
      .withMessage("Invalid URL format for profile picture."),

    // Identity Type must be a non-empty string
    check("identity_type")
      .isString()
      .withMessage("Identity type should be a string.")
      .notEmpty()
      .withMessage("Identity type is required.")
      .isLength({ max: 50 })
      .withMessage("Identity type must be less than 50 characters."),

    // Identity Document must be a string if provided
    check("identity_document")
      .optional()
      .isString()
      .withMessage("Identity document should be a string.")
      .isLength({ max: 255 })
      .withMessage("Identity document must be less than 255 characters."),
  ];
}

export { doctorRegistrationValidationRules };
