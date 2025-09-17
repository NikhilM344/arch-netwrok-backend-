import { userSignUpModle } from "../../models/auth/usersignupmodle.js";
import { vendorSignUpModel } from "../../models/auth/professionalsignupmodel.js";
import sendMail from "../mail/sendmail.js";
import emailVerificationTemplate from "../mail/templets/emailverificationtemplate.js";
import { v4 as uuidv4 } from "uuid";


export const sendOtpHelper = async (user) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      const emailVerificationId = uuidv4();
    let updatedUser;

    if (user.role === "user") {
      updatedUser = await userSignUpModle.findByIdAndUpdate(
        user._id,
        { $set: { otp, otpExpiry,emailVerificationId } },
        { new: true }
      );
    } else if (user.role === "professional") {
      updatedUser = await vendorSignUpModel.findByIdAndUpdate(
        user._id,
        { $set: { otp, otpExpiry,emailVerificationId } },
        { new: true }
      );
    }

    if (updatedUser && user.role==="professional") {
      await sendMail(
        updatedUser.representativeEmail,
        "Verify Your Email",
        emailVerificationTemplate(updatedUser.representativeName, updatedUser.otp)
      );
      return emailVerificationId;
    }else if(updatedUser && user.role==="user"){
       await sendMail(
        updatedUser.email,
        "Verify Your Email",
        emailVerificationTemplate(updatedUser.firstName, updatedUser.otp)
      );
      return emailVerificationId;
    }
    return false;
  } catch (error) {
    console.error("sendOtpHelper error:", error);
    return false;
  }
};
