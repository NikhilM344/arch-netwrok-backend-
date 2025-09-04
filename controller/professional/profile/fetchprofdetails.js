import sendResponse from "../../../utility/response.js";
import { vendorSignUpModel } from "../../../models/auth/professionalsignupmodel.js";

// this is used api
export const getProfessionalProfileDetail = async (req, res) => {
  try {
    const {id} = req.userInfo;
    if (!id) {
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "professional id is required"
      );
    }
      // find vendor details
    const professionalDetails = await vendorSignUpModel
      .findById(id)
      .select(
        "-password -otp -otpExpiry -emailVerificationId -__v -createdAt -updatedAt"
      );
    if (!professionalDetails) {
      return sendResponse(
        res,
        404,
        false,
        null,
        null,
        "professional details not found"
      );
    }
    return sendResponse(
      res,
      200,
      true,
      professionalDetails,
      null,
      "professional details fetch successfully"
    );
  } catch (error) {
    console.log("error occur in fetch professional profile details", error);
    return sendResponse(res, 500, false, null, null, "internal server error");
  }
};
