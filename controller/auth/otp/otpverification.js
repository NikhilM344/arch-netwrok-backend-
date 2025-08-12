import { vendorSignUpModel } from "../../../models/auth/vendorsignupmodle.js";
import sendResponse from "../../../utility/response.js";
import sendMail from "../../../utility/mail/sendmail.js";
import emailVerificationTemplate from "../../../utility/mail/templets/emailverificationtemplate.js";

export const verifyOtp = async (req, res) => {
  try {
    const { emailVerificationId, otp } = req.body;

    const user = await vendorSignUpModel.findOne({ emailVerificationId });
    if (!user)
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "Invalid verification ID"
      );

    if (user.isEmailVerfication) {
      return sendResponse(res, 400, false, null, null, "User already verified");
    }
    if (user.otpExpiry < new Date()) {
      return sendResponse(res, 400, false, null, null, "OTP expired");
    }

    if (user.otp !== otp) {
      return sendResponse(res, 400, false, { otpExpiry: user.otpExpiry }, null, "Invalid OTP");
    }

    user.isEmailVerfication = true;
    user.otp = null;
    user.otpExpiry = null;
    user.emailVerificationId = null;

    await user.save();
    return sendResponse(
      res,
      200,
      true,
      null,
      null,
      "Email verified successfully"
    );
  } catch (err) {
    console.error(err);
    sendResponse(
      res,
      500,
      false,
      null,
      null,
      "Internal Server error Please Try Again"
    );
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { emailVerificationId } = req.body;

    const user = await vendorSignUpModel.findOne({ emailVerificationId });
    if (!user)
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "Invalid verification ID"
      );

    if (user.isEmailVerfication) {
      return sendResponse(res, 400, false, null, null, "User already verified");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendMail(user.email, "Resend OTP", emailVerificationTemplate(
        user.fullName,
        otp
    ));

    return sendResponse(res,200,true,{ otpExpiry: user.otpExpiry },null,"OTP resent successfully On Your Email");
  } catch (err) {
    console.error(err);
    sendResponse(res,500,false,null,null,"Internal Server Error");
  }
};

export const getOtpStatus = async (req, res) => {
  try {
    const { emailVerificationId } = req.body;

    const user = await vendorSignUpModel.findOne({ emailVerificationId });
    if (!user) {
      return sendResponse(res, 400, false, null, null, "Invalid verification ID");
    }

    if (user.isEmailVerfication) {
      return sendResponse(res, 400, false, null, null, "User already verified");
    }

    return sendResponse(res, 200, true, {
      otpExpiry: user.otpExpiry,
    });
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, null, null, "Internal Server Error");
  }
};

