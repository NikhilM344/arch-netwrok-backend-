import { Router } from "express";
const router = Router();
import { forForgetPasswordOtpVerification } from "../../../controller/password/forgetpassword.js";
import { verifyOtpForForgetPassword } from "../../../controller/password/forgetpassword.js";
import { forgetPassword } from "../../../controller/password/forgetpassword.js";
import { checkRequestForForgetPassword } from "../../../middleware/forgetpasswordmiddleware.js";
import { resendOtpForForgetPassword } from "../../../controller/password/forgetpassword.js";

router
  .post("/forget-password/otp-verification", forForgetPasswordOtpVerification)
  .post("/forget-password/verify-otp", verifyOtpForForgetPassword)
  .post("/forget-password", checkRequestForForgetPassword, forgetPassword)
  .post("/forget-password/resend-otp",resendOtpForForgetPassword)

export default router;
