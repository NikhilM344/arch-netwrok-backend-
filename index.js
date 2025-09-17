import express from "express";
import enviormentConfig from "./configs/enviorment.js";
import cors from "cors";
import connectDb from "./configs/dbconfig.js";
import userRegistration from "./router/auth/userauth.js";
import professionList from "./router/list/professionalListRoute.js";
import clientRequest from "./router/requests/clientRequestsrouter.js";
import userprofile from "./router/profile/profileRouter.js";
import professionalPortfolio from "./router/professional/portfolio/createportfolio.js";
import professionalProject from "./router/professional/project/projectroute.js";
import reviewRouter from "./router/user/review/reviewrouter.js";
import updateProfileRouter from "./router/user&professional/updateprofilerouter.js";
import professionaldetailsRouter from "./router/professional/profile/professionalprorouter.js";
import adminRoutes from "./router/admin/adminroutes.js";
import adminClientRoutes from "./router/admin/client/adminclientRoutes.js";
import adminProfRoutes from "./router/admin/professional/adminprofRoutes.js";
import otpVerificationRoutes from "./router/auth/otp/otpverificationroute.js";
import proDashboardInfoRoutes from "./router/professional/dashboard/dashboardRoutes.js";
import newRegistrationRoute from "./router/auth/newprofessionalauth.js";
import deleteProfessionalAccountRouter from "./router/professional/account/deleteprofaccountrouter.js";
import userDashboardDetailRouter from "./router/user/dashboard/userdashboarddetailrouter.js";
import forgetPasswordOtpVericationRoutes from './router/auth/password/forgetpasswordrouter.js'

import "./utility/mail/schdulemail.js";

const app = express();
connectDb();
const allowedOrigins = [
  "https://www.buildquery.com",
  "https://buildquery.com",
  "https://admin.buildquery.com",
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:8082",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res) => {
  res.json({ message: "Build Query API is live 🚀" });
});
app.use("/admin", adminRoutes, adminClientRoutes, adminProfRoutes);
app.use(
  "/api",
  reviewRouter,
  updateProfileRouter,
  professionaldetailsRouter,
  deleteProfessionalAccountRouter
);
app.use("/uploads", express.static("uploads"));
app.use("/userauth", userRegistration);
app.use("/auth", otpVerificationRoutes, newRegistrationRoute,forgetPasswordOtpVericationRoutes);
app.use("/professional", professionList, proDashboardInfoRoutes);
app.use("/request", clientRequest);
app.use("/user", userprofile, userDashboardDetailRouter);
app.use("/portfolio", professionalPortfolio);
app.use("/profes", professionalProject);

app.listen(enviormentConfig.port, () => {
  console.log(`server is running on port ${enviormentConfig.port}`);
});
