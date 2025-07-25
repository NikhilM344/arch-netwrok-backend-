import sendResponse from "../../utility/response.js";
import { vendorSignUpModel } from "../../models/auth/vendorsignupmodle.js";
export const professionalList = async (req, res) => {
  try {
    const { service, location, pincode } = req.query;

    console.log("service location pincode",service,location,pincode)
    const filter = {};

    if (service) {
      filter.category = service; 
    }

    if (location) {
      filter.city = location; 
    }

    if (pincode) {
      filter.pinCode = pincode; 
    }

    const professionals = await vendorSignUpModel
      .find(filter)
      .select("fullName category portfolio.description city state portfolio.buildingType");

    return sendResponse(res, 200, true, professionals, null, "Professional list fetched successfully");
    
  } catch (error) {
    console.error("Error fetching professionals:", error);
    return sendResponse(res, 500, false, null, error.message, "Internal Server Error");
  }
};
