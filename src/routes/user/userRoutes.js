import express from "express";
import { login } from "../../controllers/user/loginControllers.js";
import { logout } from "../../controllers/user/logoutControllers.js";
import { contactUs } from "../../controllers/user/contactUsControllers.js";
import { userQueryValidationRules } from "../../middlewares/user/validateUserQuery.js";
import { userLoginValidationRules } from "../../middlewares/user/validateUserLogin.js";
import { validate } from "../../utils/validationResult.js";
import { verifyJWT } from "../../middlewares/user/verifyJWT.js";

const router = express.Router();

router.post("/auth/login", userLoginValidationRules(), validate, login);
router.post("/contact-us", userQueryValidationRules(), validate, contactUs);
router.post("/logout", verifyJWT("user"), logout);

export default router;
