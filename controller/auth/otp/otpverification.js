import { vendorSignUpModel } from "../../../models/auth/professionalsignupmodel.js";
import { userSignUpModle } from "../../../models/auth/usersignupmodle.js";
import sendResponse from "../../../utility/response.js";
import sendMail from "../../../utility/mail/sendmail.js";
import emailVerificationTemplate from "../../../utility/mail/templets/emailverificationtemplate.js";

export const verifyOtp = async (req, res) => {
  try {
    const { emailVerificationId, otp, role } = req.body;

    // ✅ Input validation
    if (!emailVerificationId || !otp || !role) {
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "emailVerificationId, otp aur role required hai"
      );
    }

    // ✅ Role ke basis par model select
    const model = role === "user" ? userSignUpModle : vendorSignUpModel;

    // ✅ User/Vendor find
    const user = await model.findOne({ emailVerificationId });
    if (!user) {
      return sendResponse(res, 400, false, null, null, "Invalid verification ID");
    }

    // ✅ Already verified check
    if (user.isEmailVerfication) {
      return sendResponse(res, 400, false, null, null, "User already verified");
    }

    // ✅ OTP expiry check
    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return sendResponse(res, 400, false, null, null, "OTP expired");
    }

    // ✅ OTP match check
    if (user.otp !== otp) {
      return sendResponse(
        res,
        400,
        false,
        { otpExpiry: user.otpExpiry },
        null,
        "Invalid OTP"
      );
    }

    // ✅ Update fields after successful verification
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
    console.error("verifyOtp error:", err);
    return sendResponse(
      res,
      500,
      false,
      null,
      null,
      "Internal Server Error. Please try again later."
    );
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { emailVerificationId, role } = req.body;

    // ✅ Validate input
    if (!emailVerificationId || !role) {
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "emailVerificationId and role required"
      );
    }

    // ✅ Choose correct model based on role
    const model = role === "user" ? userSignUpModle : vendorSignUpModel;

    // ✅ Find user/vendor by verificationId
    const user = await model.findOne({ emailVerificationId });
    if (!user) {
      return sendResponse(res, 400, false, null, null, "Invalid verification ID");
    }

    // ✅ Check already verified
    if (user.isEmailVerfication) {
      return sendResponse(res, 400, false, null, null, "User already verified");
    }

    // ✅ Generate new OTP & expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10-minute expiry
    await user.save();

    // ✅ Send email with new OTP
    await sendMail(
      user.email,
      "Resend OTP",
      emailVerificationTemplate(user.fullName, otp)
    );

    // ✅ Respond to client
    return sendResponse(
      res,
      200,
      true,
      { otpExpiry: user.otpExpiry },
      null,
      "OTP resent successfully on your email"
    );
  } catch (err) {
    console.error("resendOtp error:", err);
    return sendResponse(
      res,
      500,
      false,
      null,
      null,
      "Internal Server Error. Please try again later."
    );
  }
};

export const getOtpStatus = async (req, res) => {
  try {
    const { emailVerificationId, role } = req.body;

    // ✅ Input validation
    if (!emailVerificationId || !role) {
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "emailVerificationId and role required"
      );
    }

    // ✅ Choose correct model based on role
    const model = role === "user" ? userSignUpModle : vendorSignUpModel;

    // ✅ Find user/vendor
    const user = await model.findOne({ emailVerificationId });
    if (!user) {
      return sendResponse(res, 400, false, null, null, "Invalid verification ID");
    }

    // ✅ Already verified check
    if (user.isEmailVerfication) {
      return sendResponse(res, 400, false, null, null, "User already verified");
    }

    // ✅ Return OTP expiry info
    return sendResponse(res, 200, true, {
      otpExpiry: user.otpExpiry,
    });
  } catch (err) {
    console.error("getOtpStatus error:", err);
    return sendResponse(
      res,
      500,
      false,
      null,
      null,
      "Internal Server Error. Please try again later."
    );
  }
};