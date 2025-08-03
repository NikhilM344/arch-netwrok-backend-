import { vendorSignUpModel } from "../../models/auth/vendorsignupmodle.js";
import bcrypt from "bcryptjs";
import sendResponse from "../../utility/response.js";
import enviormentConfig from "../../configs/enviorment.js";

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

    // ✅ Basic validation
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

    // 🔎 Check if vendor already exists
    const existingVendor = await vendorSignUpModel.findOne({ email });
    if (existingVendor) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "You are already registered. Please login.",
        "Already Registered"
      );
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

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

    return sendResponse(
      res,
      201,
      true,
      {
        email: newVendor.email,
        fullName: newVendor.fullName,
        companyName: newVendor.companyName,
      },
      null,
      "Vendor registered successfully"
    );
  } catch (error) {
    // ⚠️ Error handling
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
