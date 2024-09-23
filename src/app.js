import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import config from "../config/config.js";
import errorHandler from "./middlewares/user/errorHandler.js";

const app = express();

const corsOptions = {
  origin: config.frontendOrigin,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ROUTES
import doctorRoutes from "./routes/doctor/doctorRoutes.js";
import patientRoutes from "./routes/patient/patientRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import userRoutes from "./routes/user/userRoutes.js";

app.use(`${config.baseURL}/${config.apiVersion}/user`, userRoutes);
app.use(`${config.baseURL}/${config.apiVersion}/doctor`, doctorRoutes);
app.use(`${config.baseURL}/${config.apiVersion}/patient`, patientRoutes);
app.use(`${config.baseURL}/${config.apiVersion}/admin`, adminRoutes);

app.use(errorHandler);

export default app;
