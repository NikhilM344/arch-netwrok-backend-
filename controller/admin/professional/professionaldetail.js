import sendResponse from "../../../utility/response.js";
import { vendorSignUpModel } from "../../../models/auth/vendorsignupmodle.js";

export const fetchProfessionalDetailForAdmin = async (req, res) => {
  try {
    const professionalDetail = await vendorSignUpModel
      .find({})
      .select("fullName email city  state  _id")
      .lean();

    if (professionalDetail.length === 0) {
      return sendResponse(
        res,
        404,
        false,
        null,
        "No professional details found",
        "No professionals registered yet"
      );
    }

    const modifiedProfessionalDetails = professionalDetail.map(
      (professional) => {
        return {
          id: professional._id,
          fullName: professional.fullName,
          email: professional.email,
          city: professional.city,
          state: professional.state,
        };
      }
    );
    return sendResponse(
      res,
      200,
      true,
      modifiedProfessionalDetails,
      null,
      "Professional details fetched successfully"
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message || "Internal server error",
      "Error fetching professional details"
    );
  }
};

export const fetchProfessionalDetailsInDetailedForAdmin = async (req, res) => {
  try {
     console.log("req.query",req.params);
     const  professionalId = req.params.professionalId;
    if (!professionalId) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Professional ID is required",
        "Please provide a valid professional ID"
      );
    }

    const professionalDetail = await vendorSignUpModel
      .find({_id: professionalId})
      .select("-password -__v -updatedAt -role")
      .lean();

    if (professionalDetail.length === 0) {
      return sendResponse(
        res,
        404,
        false,
        null,
        "No professional details found",
        "No professionals registered yet"
      );
    }
    const modifiedProfessionalDetails = professionalDetail.map(
      (professional) => {
        return {
          businessDetails: {
            businessName: professional.comapnyName,
            placeofBusinessRegistration: professional.registrationPlace,
            businessPrincipleArchitectName: professional.architectName,
            businessStablishedYear: professional.businessStablishedYear,
          },
          businessCategory: professional.category,
          profPersonalDetails: {
            fullName: professional.fullName,
            email: professional.email,
            mobileNumber: professional.mobileNumber,
            address: professional.address,
            city: professional.city,
            state: professional.state,
            pinCode: professional.pinCode,
          },
          profPortfolio: {
            projectTitle: professional.portfolio.projectTitle,
            buildingType: professional.portfolio.buildingType,
            buildingLocation: professional.portfolio.buildingLocation,
            projectcompletionYear: professional.portfolio.projectcompletionYear,
            description: professional.portfolio.description,
            thumbnailImage: professional.portfolio.thumbnailImage,
            portfolioThumbnailImage:
              professional.portfolio.portfolioThumbnailImage,
          },
        };
      }
    );

    sendResponse(
      res,
      200,
      true,
      modifiedProfessionalDetails,
      null,
      "Professional details fetched successfully"
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message || "Internal server error",
      "Error fetching professional details"
    );
  }
};
