import sendResponse from "../../../utility/response.js";
import { vendorSignUpModel } from "../../../models/auth/professionalsignupmodel.js";

// modified with new
export const fetchProfessionalDetailForAdmin = async (req, res) => {
  try {
    const professionalDetail = await vendorSignUpModel
      .find({})
      .select(
        "representativeName representativeEmail city  state  _id createdAt"
      )
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
          fullName: professional.representativeName,
          email: professional.representativeEmail,
          city: professional.city,
          state: professional.state,
          createdAt: professional.createdAt.toISOString().split("T")[0],
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

// modified with new
export const fetchProfessionalDetailsInDetailedForAdmin = async (req, res) => {
  try {
    const professionalId = req.params.professionalId;
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
      .find({ _id: professionalId })
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
            companyName: professional.businessName,
            placeofBusinessRegistration:
              professional.registeredAddress.line1 || "Address not provided",
            businessStablishedYear:
              professional.dateOfEstablishment.toString().split("T")[0] ||
              "Year not specified",
            businessProof: professional.companyRegistrationDoc || "",
            businessType:
              professional.businessType || "Business type not specified",
            businessEmail: professional.companyEmail || "Email not provided",
            businessMobile: professional.companyPhone || "Mobile not provided",
            businessWebsite: professional.websiteUrl || "Website not provided",
            businessLogo: professional.logo || "logo not provided",
          },
          businessCategory: professional.category,
          //  modified with new
          profPersonalDetails: {
            fullName: professional.representativeName,
            email: professional.representativeEmail,
            mobileNumber: professional.representativeMobile,
            address: `${professional.state}, ${professional.city}, ${professional.pincode}`,
            city: professional.city,
            state: professional.state,
            pinCode: professional.pincode,
          },
          profPortfolio: {
            projectTitle: professional.projects.title,
            buildingType:
              professional.projects.category || "Category not specified",
            buildingLocation:
              professional.projects.location || "Location not specified",
            description:
              professional.projects.summary || "Summary not provided",
            thumbnailImage:
              professional.projects.image ||
              "Project Image Not Uploaded By Professional",
          },
          profVerificationStatus: {
            isVerifiedByAdmin: professional.isVerifiedByAdmin,
            isVerificationRejectionReason:
              professional.isVerificationRejectionReason,
          },
          documents: {
            kycIdType: professional.kycIdType || "KYC ID type not specified",
            kycIdDocument:
              professional.kycIdDocument || "kyc document not provided",
            // optional documents
            ...(professional.businessType !== "Individual" && {
              companyRegistrationDoc: professional.companyRegistrationDoc,
            }),
            ...(professional.category == "ArchitectureConsultant" && {
              coaRegistrationDoc: professional.coaRegistrationDoc,
            }),
            ...(professional.gstNumber && {
              gstNumber: professional.gstNumber,
            }),
            ...(professional.gstDocument && {
              gstDocument: professional.gstDocument,
            }),
            ...(professional.category == "StructuralConsultant" && {
              structuralRegistrationDoc: professional.structuralRegistrationDoc,
            }),
            ...(professional.category == "Contractor" && {
              constructionLicenseDoc: professional.constructionLicenseDoc,
            }),
          },
          description:{
            shortDescription:professional.shortDescription || "Not Provided",
            LongDescription:professional.detailedDescription || "Not Provided"
          }
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
