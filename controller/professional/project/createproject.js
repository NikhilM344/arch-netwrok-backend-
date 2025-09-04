import { createProjectModal } from "../../../models/professional/project/createproject.js";
import sendResponse from "../../../utility/response.js";
import enviormentConfig from "../../../configs/enviorment.js";
import { vendorSignUpModel } from "../../../models/auth/professionalsignupmodel.js";

// modified with new
export const createProfessionalProject = async (req, res) => {
  if (!req.professionalId) {
    return sendResponse(
      res,
      400,
      false,
      null,
      null,
      "professionalId is required"
    );
  }

  try {
    const {
      projectTitle,
      projectCategory,
      projectSubCategory,
      projectYearOfCompletion,
      projectCity,
      projectState,
      projectArea,
      projectObjectives,
      projectDesignApproach,
      projectHighLights,
      projectNotes,
      professionalProjectRole,
      projectTeamMember,
      projectToolsAndSoftware,
      isDraft,
      isPublished,
      projectServiceType,
      projectBuldingType,
      lct,
      projectStatus,
      isFeatured,
    } = req.body;

    const baseURL = `${enviormentConfig.backendBaseUrl}uploads/projects`;

    // Helper to convert multiple files to URLs
    const getUrls = (files) =>
      files?.map((file) => `${baseURL}/${file.filename}`) || [];

    const projectImages = req.files?.projectImage || [];
    if (projectImages.length === 0) {
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "At least one project image is required"
      );
    }

    const newProject = new createProjectModal({
      professionalId: req.professionalId,
      isDraft,
      isPublished,
      isFeatured,
      projectBasicDetail: {
        projectTitle,
        projectCategory,
        projectSubCategory,
        projectYearOfCompletion,
        projectCity,
        projectState,
        projectArea,
        projectStatus,
      },
      projectNarritveAndDesc: {
        projectObjectives,
        projectDesignApproach,
        projectHighLights,
        ...(projectNotes?.trim() && { projectNotes }),
      },
      projectTt: {
        professionalProjectRole,
        projectTeamMember,
        projectToolsAndSoftware,
      },
      tagsAndControl: {
        projectServiceType,
        projectBuldingType,
        lct,
      },
      projectImage: getUrls(req.files?.projectImage),
      projectExecutionImg: getUrls(req.files?.projectExecutionImg),
      presentaionBoardImg: getUrls(req.files?.presentaionBoardImg),
      projectTechDocImg: getUrls(req.files?.projectTechDocImg),
    });

    const savedProject = await newProject.save();
    if (savedProject) {
      const countedDocument = await createProjectModal.countDocuments({professionalId:req.professionalId,isPublished:true});
      if (countedDocument) {
        const updatedVendor = await vendorSignUpModel.findByIdAndUpdate(
          { _id: req.professionalId },
          { isProjectCount: countedDocument }, // count ko update kar diya
          { new: true }
        );
      }
    }

    return sendResponse(
      res,
      201,
      true,
      savedProject,
      null,
      "Project created successfully"
    );
  } catch (error) {
    console.error("Project Creation Error:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return sendResponse(
        res,
        400,
        false,
        null,
        errors[0],
        "Validation failed"
      );
    }
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message,
      "Failed to create project"
    );
  }
};

export default createProfessionalProject;
