import express from 'express'
import { sendOtpForVerification } from "../../../controller/auth/otp/otpverfication.js";

const router = express.Router();

router.post("/send-otp",sendOtpForVerification)

export default router;