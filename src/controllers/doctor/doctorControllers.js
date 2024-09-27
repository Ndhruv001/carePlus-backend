import {
  registerDoctorQuery,
  isEmailExist,
  getDoctorsListQuery,
} from "../../queries/doctor/doctorQueries.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import { formatDateForMySQL } from "../../utils/formatDateAndTime.js";
import { capitalizeFirstLetter } from "../../utils/formatName.js";
import { generateDoctorBio } from "../../utils/gemini.js";

async function registerDoctor(req, res) {
  const {
    name,
    email,
    password,
    dob,
    gender,
    phone_number,
    specialization,
    medical_license_number,
    experience,
    education_detail,
    identity_type,
  } = req.body;

  const { profile_picture, identity_document, certification } = req.files;

  // Check if the email already exists
  const isExist = await isEmailExist(email);
  if (isExist) {
    return res.status(409).json({
      success: false,
      message: "Email is already exist",
    });
  }

  // Format the name and date of birth
  const formatedName = capitalizeFirstLetter(name);
  const formatedDOB = formatDateForMySQL(dob);

  // Generate doctor bio
  const bio = await generateDoctorBio({
    name,
    specialization,
    experience,
    education_detail,
  });

  try {
    // Upload files to Cloudinary directly from memory
    const profilePictureUrl = profile_picture
      ? await uploadOnCloudinary(profile_picture[0].buffer, profile_picture[0].originalname)
      : null;

    const identityDocumentUrl = identity_document
      ? await uploadOnCloudinary(identity_document[0].buffer, identity_document[0].originalname)
      : null;

    const certificationUrl = certification
      ? await uploadOnCloudinary(certification[0].buffer, certification[0].originalname)
      : null;

    // Save doctor data into the database
    const result = await registerDoctorQuery({
      name: formatedName,
      email,
      password,
      dob: formatedDOB,
      gender,
      phone_number,
      specialization,
      medical_license_number,
      experience,
      certification: certificationUrl?.secure_url,
      education_detail,
      profile_picture: profilePictureUrl?.secure_url,
      identity_type,
      identity_document: identityDocumentUrl?.secure_url,
      bio,
    });

    // Respond with a success message
    res.status(201).json({
      message: "Doctor registered successfully",
      doctorId: result.insertId,
    });
  } catch (error) {
    console.log("🚀 ~ registerDoctor ~ error:", error);
    res.status(500).json({
      error: "Error registering doctor",
      details: error.message,
    });
  }
}


async function getDoctorsList(req, res) {
  try {
    const doctorsList = await getDoctorsListQuery();
    return res.status(200).json({ success: true, data: doctorsList });
  } catch (error) {
    console.log("🚀 ~ getDoctorsList ~ error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message || "",
      });
  }
}

export { registerDoctor, getDoctorsList };
