import sendResponse from "../../utility/response.js";
import { vendorSignUpModel } from "../../models/auth/professionalsignupmodel.js";

// modified with new
export const professionalList = async (req, res) => {
  try {
    const { service, location, pincode } = req.query;
    const filter = { isVerifiedByAdmin: true };

    if (service) {
      filter.category = service;
    }

    if (location) {
      filter.city = location;
    }

    if (pincode) {
      filter.pincode = pincode;
    }

    const professionals = await vendorSignUpModel
      .find(filter)
      .select(
        "representativeName logo businessName category projects.summary city state projects.category slug"
      );

    return sendResponse(
      res,
      200,
      true,
      professionals,
      null,
      "Professional list fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching professionals:", error);
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message,
      "Internal Server Error"
    );
  }
};
