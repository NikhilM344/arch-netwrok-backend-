import express from "express";
import { verifyOtp,resendOtp,getOtpStatus } from "../../../controller/auth/otp/otpverification.js";
const Router = express.Router();

Router.post("/verifiyotp",verifyOtp)
.post("/resendotp",resendOtp)
.post("/otpstatus",getOtpStatus);

export default Router
