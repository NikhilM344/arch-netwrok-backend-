import sendResponse from "../../../utility/response.js";
import { vendorSignUpModel } from "../../../models/auth/professionalsignupmodel.js";
import { reviewModel } from "../../../models/user/reviewandrating/clientreviewandrating.js";
import { createProjectModal } from "../../../models/professional/project/createproject.js";

// modified with new
export const fetchProfessionalProfileDetail = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return sendResponse(
        res,
        404,
        false,
        null,
        null,
        "Specific Resource Not Found"
      );
    }
    // find vendor detail
    const vendorIntialDetail = await vendorSignUpModel
      .findById(id)
      .select(
        "representativeName businessName isProjectCount avgRating city state representativeMobile representativeEmail dateOfEstablishment shortDescription representativePhoto logo"
      )
      .lean();

    const reviews = await reviewModel
      .find({ professionalId: id })
      .select("rating comment createdAt")
      .populate({
        path: "clientId",
        select: "firstName lastName",
      })
      .lean()
      .exec();

    // find vendor project detail
    const projectDetail = await createProjectModal
      .find({ professionalId: id })
      .select("projectBasicDetail projectNarritveAndDesc projectImage")
      .lean();

    // modified vendor details
    const vendorModifiedDetails = Object.entries(vendorIntialDetail).reduce(
      (acc, [key, value]) => {
        const newKey = key.replace("_", "");
        acc[newKey] = value;
        return acc;
      },
      {}
    );
    // modified Rating
    const modifiedRating = reviews.map((current) => {
      const modifiedReview = {
        id: current._id.toString(),
        clientId: current.clientId._id.toString(),
        rating: current.rating,
        firstName: current.clientId.firstName, // ✅ Corrected
        lastName: current.clientId.lastName,

        comment: current.comment,
        createdAt: current.createdAt,
      };
      return modifiedReview;
    });
    // modified project details
    const modifiedProjectDetails = projectDetail.map((current) => {
      const modifiedProject = {
        id: current._id.toString(),
        projectBasicDetail: {
          projectTitle: current.projectBasicDetail.projectTitle,
          projectCategory: current.projectBasicDetail.projectCategory,
          projectSubCategory: current.projectBasicDetail.projectSubCategory,
          projectYearOfCompletion:
            current.projectBasicDetail.projectYearOfCompletion,
          projectCity: current.projectBasicDetail.projectCity,
          projectState: current.projectBasicDetail.projectState,
          projectStatus: current.projectBasicDetail.projectStatus,
          id: current.projectBasicDetail._id.toString(),
        },
        projectNarritveAndDesc: {
          projectObjectives: current.projectNarritveAndDesc.projectObjectives,
          projectDesignApproach:
            current.projectNarritveAndDesc.projectDesignApproach,
          projectHighLights: current.projectNarritveAndDesc.projectHighLights,
          projectNotes: current.projectNarritveAndDesc.projectNotes,
          id: current.projectNarritveAndDesc._id.toString(),
        },
        projectImage: current.projectImage[0],
      };
      return modifiedProject;
    });
    if (!vendorIntialDetail || !reviews || !projectDetail) {
      return sendResponse(res, 500, false, null, null, "internal server error");
    } else {
      const finalPayload = {
        profesBasicDetail: vendorModifiedDetails,
        profesReviewDetail: modifiedRating,
        profesProjectDetail: modifiedProjectDetails,
      };
      return sendResponse(
        res,
        200,
        true,
        finalPayload,
        null,
        "fetch professional details successfully"
      );
    }
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, null, null, "internal server error");
  }
};
