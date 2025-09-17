import sendResponse from "../../utility/response.js";
import { userSignUpModle } from "../../models/auth/usersignupmodle.js";
import { vendorSignUpModel } from "../../models/auth/professionalsignupmodel.js";
import { sendOtpHelper } from "../../utility/otp/sendotp.js";
import resetPasswordLinkTemplate from "../../utility/mail/templets/resetPasswordLinkTemplate.js";
import sendMail from "../../utility/mail/sendmail.js";
import enviormentConfig from "../../configs/enviorment.js";
import generateJWTForLink from "../../utility/genratejwtforlink.js";
import emailVerificationTemplate from "../../utility/mail/templets/emailverificationtemplate.js";
import bcrypt from "bcryptjs";

export const forForgetPasswordOtpVerification = async (req, res) => {
  const { role, email } = req.body;

  if (!email) {
    return sendResponse(
      res,
      400,
      false,
      null,
      null,
      `Please enter your registered email`
    );
  }

  try {
    if (role === "user") {
      const user = await userSignUpModle.findOne({ email }); // ✅ object filter
      if (!user) {
        return sendResponse(
          res,
          400,
          false,
          null,
          null,
          `No account found for ${email}`
        );
      }
      const emailVerificationId = await sendOtpHelper(user);
      if (emailVerificationId) {
        return sendResponse(
          res,
          200,
          true,
          emailVerificationId,
          null,
          "Six-digit OTP sent to your email. Please check."
        );
      }
    } else if (role === "professional") {
      const user = await vendorSignUpModel.findOne({representativeEmail:email});
      if (!user) {
        return sendResponse(
          res,
          400,
          false,
          null,
          null,
          `No account found for ${email}`
        );
      }
      const emailVerificationId = await sendOtpHelper(user);
      if (emailVerificationId) {
        return sendResponse(
          res,
          200,
          true,
          emailVerificationId,
          null,
          "Six-digit OTP sent to your email. Please check."
        );
      }
    } else {
      return sendResponse(res, 400, false, null, null, "Invalid role");
    }
  } catch (err) {
    return sendResponse(res, 500, false, null, err.message);
  }
};

export const verifyOtpForForgetPassword = async (req, res) => {
  try {
    const { role, emailVerificationId, otp } = req.body;

    if (!role || !emailVerificationId || !otp) {
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "Invalid Request. Please Try Again"
      );
    }

    let checkUser = null;

    // ---------- USER BRANCH ----------
    if (role === "user") {
      checkUser = await userSignUpModle.findOne({ emailVerificationId });
      if (!checkUser) {
        return sendResponse(
          res,
          400,
          false,
          null,
          null,
          "Invalid verification ID"
        );
      }
      if (checkUser.otpExpiry < new Date()) {
        return sendResponse(res, 400, false, null, null, "OTP expired");
      }
      if (checkUser.otp !== otp) {
        return sendResponse(
          res,
          400,
          false,
          null,
          null,
          "Please enter a valid OTP"
        );
      }

      const payload = { userId: checkUser._id, role };
      const token = generateJWTForLink(payload);
      const link = `${enviormentConfig.frontEndBaseUrl}auth/forget-password-form?token=${token}`;

      await sendMail(
        checkUser.email,
        "Reset Password",
        resetPasswordLinkTemplate(checkUser.firstName, link)
      );

      // ✅ Update only required fields to avoid schema validation errors
      await userSignUpModle.updateOne(
        { _id: checkUser._id },
        { $set: { otp: null, otpExpiry: null, emailVerificationId: null } }
      );

      return sendResponse(
        res,
        200,
        true,
        null,
        null,
        "Password reset link sent to your email"
      );
    }

    // ---------- PROFESSIONAL BRANCH ----------
    else if (role === "professional") {
      checkUser = await vendorSignUpModel.findOne({ emailVerificationId });
      if (!checkUser) {
        return sendResponse(
          res,
          400,
          false,
          null,
          null,
          "Invalid verification ID"
        );
      }
      if (checkUser.otpExpiry < new Date()) {
        return sendResponse(res, 400, false, null, null, "OTP expired");
      }
      if (checkUser.otp !== otp) {
        return sendResponse(
          res,
          400,
          false,
          null,
          null,
          "Please enter a valid OTP"
        );
      }

      const payload = { userId: checkUser._id, role };
      const token = generateJWTForLink(payload);
      const link = `${enviormentConfig.frontEndBaseUrl}auth/forget-password-form?token=${token}`;

      await sendMail(
        checkUser.representativeEmail,
        "Reset Password",
        resetPasswordLinkTemplate(checkUser.representativeName, link)
      );

      await vendorSignUpModel.updateOne(
        { _id: checkUser._id },
        { $set: { otp: null, otpExpiry: null, emailVerificationId: null } }
      );

      return sendResponse(
        res,
        200,
        true,
        null,
        null,
        "Password reset link sent to your email"
      );
    }

    // Agar role na mile
    return sendResponse(res, 400, false, null, null, "Invalid role");
  } catch (error) {
    console.error("verifyOtpForForgetPassword error:", error);
    return sendResponse(res, 500, false, null, null, error.message);
  }
};

export const forgetPassword = async (req, res) => {
  const { id, role } = req.user; 
  const { newPassword } = req.body;

  if (!id || !role || !newPassword) {
    return sendResponse(res, 400, false, null, null, "Id, Role and newPassword required");
  }

  try {
    const model = role === "user" ? userSignUpModle : vendorSignUpModel;
    const user = await model.findById(id);
    if (!user) {
      return sendResponse(res, 404, false, null, null, "User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await model.updateOne({ _id: id }, { $set: { password: hashedPassword } });

    return sendResponse(
      res,
      200,
      true,
      null,
      null,
      "Password reset successfully. Please login with new password."
    );
  } catch (err) {
    console.error("Forget password error:", err);
    return sendResponse(res, 500, false, null, null, "Server error. Try again later.");
  }
};

export const resendOtpForForgetPassword = async (req, res) => {
  try {
    const { role, emailVerificationId } = req.body;

    if (!role || !emailVerificationId) {
      return sendResponse(res, 400, false, null, null, "Invalid Request. Please Try Again");
    }

    // Generate fresh OTP & expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    let userDoc = null;

    // ---------- USER BRANCH ----------
    if (role === "user") {
      userDoc = await userSignUpModle.findOne({ emailVerificationId });
      if (!userDoc) {
        return sendResponse(res, 400, false, null, null, "Invalid verification ID");
      }

      await userSignUpModle.updateOne(
        { _id: userDoc._id },
        { $set: { otp, otpExpiry } }
      );

      await sendMail(
        userDoc.email,
        "Resend OTP",
        emailVerificationTemplate(userDoc.firstName, otp)
      );

      return sendResponse(res, 200, true, null, null, "OTP resent to your email");
    }

    // ---------- PROFESSIONAL BRANCH ----------
    else if (role === "professional") {
      userDoc = await vendorSignUpModel.findOne({ emailVerificationId });
      if (!userDoc) {
        return sendResponse(res, 400, false, null, null, "Invalid verification ID");
      }

      await vendorSignUpModel.updateOne(
        { _id: userDoc._id },
        { $set: { otp, otpExpiry } }
      );

      await sendMail(
        userDoc.representativeEmail,
        "Resend OTP",
        emailVerificationTemplate(userDoc.representativeName, otp)
      );

      return sendResponse(res, 200, true, null, null, "OTP resent to your email");
    }

    // Invalid role
    return sendResponse(res, 400, false, null, null, "Invalid role");
  } catch (error) {
    console.error("resendOtpForForgetPassword error:", error);
    return sendResponse(res, 500, false, null, null, error.message);
  }
};
