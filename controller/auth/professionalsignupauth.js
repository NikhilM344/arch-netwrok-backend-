import { vendorSignUpModel } from "../../models/auth/professionalsignupmodel.js";
import sendResponse from "../../utility/response.js";
import enviormentConfig from "../../configs/enviorment.js";
import bcrypt from "bcryptjs";
import sendMail from "../../utility/mail/sendmail.js";
import { v4 as uuidv4 } from "uuid";
import emailVerificationTemplate from "../../utility/mail/templets/emailverificationtemplate.js";

// Helper to pick allowed fields
const allowFields = (obj, allowedFields) => {
  const result = {};
  for (const key of allowedFields) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      result[key] = obj[key];
    }
  }
  return result;
};

// Helper to remove empty arrays/objects
const cleanOptionalFields = (data, optionalKeys) => {
  for (const key of optionalKeys) {
    if (
      data[key] !== undefined &&
      Array.isArray(data[key]) &&
      data[key].length === 0
    ) {
      delete data[key];
    }
    if (
      data[key] !== undefined &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key]) &&
      Object.keys(data[key]).length === 0
    ) {
      delete data[key];
    }
  }
  return data;
};

export const createBusinessProfile = async (req, res) => {
  try {
    const body = req.body || {};

    // check duplicate  !!
    const existing = await vendorSignUpModel.findOne({
      $or: [
        { companyEmail: body.companyEmail?.toLowerCase() },
        { companyPhone: body.companyPhone },
        { representativeEmail: body.representativeEmail?.toLowerCase() },
        { representativeMobile: body.representativeMobile },
        { whatsappNumber: body.whatsappNumber || "" },
      ],
    });

    // return which field in duplicate !!
    if (existing) {
      let conflictField = "";
      if (existing.companyEmail === body.companyEmail?.toLowerCase()) {
        conflictField = "Company Email";
      } else if (existing.companyPhone === body.companyPhone) {
        conflictField = "Company Phone";
      } else if (
        existing.representativeEmail === body.representativeEmail?.toLowerCase()
      ) {
        conflictField = "Representative Email";
      } else if (existing.representativeMobile === body.representativeMobile) {
        conflictField = "Representative Mobile";
      } else if (existing.whatsappNumber === body.whatsappNumber) {
        conflictField = "WhatsApp Number";
      }
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        `${conflictField} already registered`
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    // create unique id for email verification
    const emailVerificationId = uuidv4();
    // genrate six digit random number for otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // set otp expiry time
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Pick allowed fields
    let profileData = allowFields(body, [
      "businessName",
      "businessType",
      "category",
      "dateOfEstablishment",
      "websiteUrl",
      "registeredAddress",
      "state",
      "district",
      "city",
      "pincode",
      "operatingAreas",
      "companyEmail",
      "companyPhone",
      "whatsappNumber",
      "representativeName",
      "designation",
      "representativeMobile",
      "representativeEmail",
      "representativePhoto",
      "gstNumber",
      "kycIdType",
      "shortDescription",
      "detailedDescription",
      "services",
      "customServices",
      "declarationAccepted",
      "tagline",
      "brandColors",
      "styleGuideFile",
      // optional nested/array fields
      "projects",
      "teamMembers",
      "capacity",
    ]);

    // Optional file/docs fields
    if (req.files?.companyRegistrationDoc?.[0]) {
      profileData.companyRegistrationDoc = `${enviormentConfig.backendBaseUrl}uploads/companyDocs/${req.files.companyRegistrationDoc[0].filename}`;
    }

    if (req.files?.coaRegistrationDoc?.[0]) {
      profileData.coaRegistrationDoc = `${enviormentConfig.backendBaseUrl}uploads/companyDocs/${req.files.coaRegistrationDoc[0].filename}`;
    }

    if (req.files?.structuralRegistrationDoc?.[0]) {
      profileData.structuralRegistrationDoc = `${enviormentConfig.backendBaseUrl}uploads/companyDocs/${req.files.structuralRegistrationDoc[0].filename}`;
    }

    if (req.files?.constructionLicenseDoc?.[0]) {
      profileData.constructionLicenseDoc = `${enviormentConfig.backendBaseUrl}uploads/companyDocs/${req.files.constructionLicenseDoc[0].filename}`;
    }

    if (req.files?.gstDocument?.[0]) {
      profileData.gstDocument = `${enviormentConfig.backendBaseUrl}uploads/companyDocs/${req.files.gstDocument[0].filename}`;
    }

    if (req.files?.businessPanCard?.[0]) {
      profileData.businessPanCard = `${enviormentConfig.backendBaseUrl}uploads/companyDocs/${req.files.businessPanCard[0].filename}`;
    }

    if (req.files?.logo?.[0]) {
      profileData.logo = `${enviormentConfig.backendBaseUrl}uploads/logos/${req.files.logo[0].filename}`;
    }
    if (req.files?.kycIdDocument?.[0]) {
      profileData.kycIdDocument = `${enviormentConfig.backendBaseUrl}uploads/kycdocument/${req.files.kycIdDocument[0].filename}`;
    }
    if (req.files?.styleGuideFile?.[0]) {
      profileData.styleGuideFile = `${enviormentConfig.backendBaseUrl}uploads/logostyle/${req.files.styleGuideFile[0].filename}`;
    }

    if (req.files?.representativePhoto?.[0]) {
      profileData.representativePhoto = `${enviormentConfig.backendBaseUrl}uploads/representatives/${req.files.representativePhoto[0].filename}`;
    }

    if (req.files?.["teamMembers[0][photo]"]?.[0]) {
      profileData.teamMembers = profileData.teamMembers || [];
      profileData.teamMembers[0] = profileData.teamMembers[0] || {};
      profileData.teamMembers[0].photo = `${enviormentConfig.backendBaseUrl}uploads/team/${req.files["teamMembers[0][photo]"][0].filename}`;
    }

    // if (req.files?.["projects[0][images]"]?.[0]) {
    //   profileData.project = profileData.project || {};
    //   profileData.project.images = `${enviormentConfig.backendBaseUrl}uploads/projects/${req.files["projects[0][images]"][0].filename}`;
    // }
    if (req.files?.["projects[image]"]?.[0]) {
      profileData.projects = profileData.projects || {};
      profileData.projects.image = `${enviormentConfig.backendBaseUrl}uploads/projects/${req.files["projects[image]"][0].filename}`;
    }

    // Clean empty optional fields
    profileData = cleanOptionalFields(profileData, [
      "projects",
      "teamMembers",
      "capacity",
      "customServices",
      "operatingAreas",
      "brandColors",
    ]);

    // Password attach
    profileData.password = hashedPassword;
    (profileData.otpExpiry = otpExpiry), (profileData.otp = otp);
    profileData.emailVerificationId = emailVerificationId;

    // Save
    const newProfile = new vendorSignUpModel(profileData);
    await newProfile.save();

    // send response when user successfully created !!
    sendResponse(
      res,
      201,
      true,
      {
        id: newProfile._id,
        businessName: newProfile.businessName,
        businessType: newProfile.businessType,
        category: newProfile.category,
        companyEmail: newProfile.companyEmail,
        companyPhone: newProfile.companyPhone,
        isVerifiedByAdmin: newProfile.isVerifiedByAdmin,
        verificationId: newProfile.emailVerificationId,
      },
      null,
      "Business profile created successfully"
    );
    await sendMail(
      newProfile.representativeEmail,
      "Verify Your Email",
      emailVerificationTemplate(newProfile.representativeEmail, newProfile.otp)
    );
  } catch (err) {
    console.error("Error in createBusinessProfile:", err.message);
    return res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
};
