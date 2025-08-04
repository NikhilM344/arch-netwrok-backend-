import bcrypt from "bcryptjs";
import twilio from "twilio";
import enviormentConfig from "../../../configs/enviorment.js";
import { vendorSignUpModel } from "../../../models/auth/vendorsignupmodle.js";
import sendResponse from "../../../utility/response.js";

// create twilio client
const client = twilio(enviormentConfig.twilioSid, enviormentConfig.twilioAuthToken);

export const sendOtpForVerification = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return sendResponse(res, 400, false, null, null, "Please enter a valid mobile number for verification");
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save OTP in DB (upsert)
    await vendorSignUpModel.findOneAndUpdate(
      { mobileNumber },
      {
        mobileNumber,
        otp: hashedOtp,
        otpExpiry: Date.now() + 5 * 60 * 1000 // 5 minutes expiry
      },
      { upsert: true, new: true }
    );

    // Twilio SMS with professional message
    await client.messages.create({
      body: `Dear User, your OTP for mobile number verification is ${otp}. This message is sent by Build-Quary Pvt Ltd. The OTP is valid for 5 minutes.`,
      from: enviormentConfig.twilioPhone,
      to: mobileNumber
    });

    return sendResponse(res, 200, true, null, null, "OTP sent successfully to the provided mobile number");
  } catch (error) {
    console.error("OTP Send Error:", error);
    return sendResponse(res, 500, false, null, null, "Failed to send OTP due to a server error. Please try again.");
  }
};


