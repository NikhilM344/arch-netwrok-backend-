import sendResponse from "../../../utility/response.js";
import { vendorSignUpModel } from "../../../models/auth/professionalsignupmodel.js";
import enviormentConfig from "../../../configs/enviorment.js";

export const updateProfessionalProfileDetail = async (req, res) => {
  const { id } = req.userInfo; // id aayega requireAuth middleware se
  if (!id) {
    return sendResponse(
      res,
      400,
      false,
      null,
      null,
      "Professional id is required"
    );
  }

  try {
    let updateData = {};
    const allowedFields = [
      "representativeName",
      "representativeEmail",
      "representativeMobile",
      "shortDescription",
      "businessName",
      "businessType",
      "dateOfEstablishment",
      "websiteUrl",
      "city",
      "state",
      "pincode",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== "") {
        updateData[field] = req.body[field];
      }
    });

    // Registered Address nested object handle karo
    if (req.body.registeredAddress) {
      updateData["registeredAddress.line1"] = req.body.registeredAddress;
    }

    // Agar naya image upload hua hai
    if (req.file) {
      updateData.representativePhoto = `${enviormentConfig.backendBaseUrl}uploads/representatives/${req.file.filename}`;
    }

    // Mongoose update (sirf jo aaye wahi field update hogi)
    const updatedProfile = await vendorSignUpModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } // new:true matlab updated doc return hoga
    );

    if (!updatedProfile) {
      return sendResponse(
        res,
        404,
        false,
        null,
        null,
        "Professional not found"
      );
    }

    return sendResponse(
      res,
      200,
      true,
      updatedProfile,
      null,
      "Profile updated successfully"
    );
  } catch (error) {
    console.error("Error while updating professional profile:", error);
    return sendResponse(res, 500, false, null, null, "Internal Server Error");
  }
};
