import { vendorSignUpModel } from "../../models/auth/vendorsignupmodle.js";
import bcrypt from "bcryptjs";
import sendResponse from "../../utility/response.js";
import enviormentConfig from "../../configs/enviorment.js";
import { v4 as uuidv4 } from 'uuid';
import emailVerificationTemplate from "../../utility/mail/templets/emailverificationtemplate.js";
import sendMail from "../../utility/mail/sendmail.js";

export const vendorRegistration = async (req, res) => {
  try {
    // Extract files from multer
    const licenseFile = req.files["licenseImage"]?.[0];
    const thumbnailFile = req.files["portfolioThumbnailImage"]?.[0];

    const licenseImageUrl = licenseFile
      ? `${enviormentConfig.backendBaseUrl}/uploads/license/${licenseFile.filename}`
      : null;

    const portfolioThumbnailUrl = thumbnailFile
      ? `${enviormentConfig.backendBaseUrl}/uploads/portfolio/${thumbnailFile.filename}`
      : null;

    const {
      category,
      companyName,
      registrationPlace,
      architectName,
      coaNumber,
      gstNumber,
      technicalRegNumber,
      businessStablishedYear,
      password,
      fullName,
      email,
      mobileNumber,
      address,
      city,
      state,
      pinCode,
      agreeTerms,
      projectTitle,
      buildingType,
      buildingLocation,
      projectcompletionYear,
      description,
      role,
    } = req.body;

    if (
      !category ||
      !companyName ||
      !registrationPlace ||
      !architectName ||
      !password ||
      !fullName ||
      !email ||
      !mobileNumber ||
      !address ||
      !city ||
      !state ||
      !pinCode ||
      !agreeTerms ||
      !projectTitle ||
      !buildingType ||
      !buildingLocation ||
      !projectcompletionYear ||
      !description
    ) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "All fields are required",
        "Validation Error"
      );
    }

    const existingVendor = await vendorSignUpModel.findOne({ email });
    if (existingVendor) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "You are already registered.Please login.",
        "Already Registered"
      );
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create unique id for email verification
    const emailVerificationId = uuidv4();
    // genrate six digit random number for otp
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
     // set otp expiry time 
       const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    

    // 🏗️ Construct vendor object
    const vendorData = {
      role,
      category,
      companyName,
      registrationPlace,
      architectName,
      licenseImage: licenseImageUrl,
      fullName,
      password: hashedPassword,
      email,
      businessStablishedYear,
      mobileNumber,
      address,
      city,
      state,
      pinCode,
      agreeTerms,
      emailVerificationId,
      otp,
      otpExpiry,
      portfolio: {
        projectTitle,
        buildingType,
        buildingLocation,
        projectcompletionYear,
        description,
        thumbnailImage: portfolioThumbnailUrl,
        portfolioThumbnailImage: portfolioThumbnailUrl,
      },
    };

    // Optional fields
    if (coaNumber?.trim()) vendorData.coaNumber = coaNumber;
    if (gstNumber?.trim()) vendorData.gstNumber = gstNumber;
    if (technicalRegNumber?.trim())
      vendorData.technicalRegNumber = technicalRegNumber;

    // 💾 Save vendor
    const newVendor = new vendorSignUpModel(vendorData);
    await newVendor.save();
    await sendMail(newVendor.email,
        "Verify Your Email",
        emailVerificationTemplate(
          newVendor.fullName,
          newVendor.otp
        )
      )
    return sendResponse(
      res,
      201,
      true,
      {
        email: newVendor.email,
        fullName: newVendor.fullName,
        companyName: newVendor.companyName,
        verificationId:newVendor.emailVerificationId
      },
      null,
      "You Are Registerd Successfully"
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return sendResponse(
        res,
        400,
        false,
        null,
        errors[0].message,
        `Validation failed on field: ${errors[0].field}`
      );
    } else if (error.code === 11000) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Email already exists",
        "Duplicate Email"
      );
    } else {
      console.error("Vendor Registration Error:", error);
      return sendResponse(
        res,
        500,
        false,
        null,
        "Internal Server Error",
        "Unexpected Error"
      );
    }
  }
};
