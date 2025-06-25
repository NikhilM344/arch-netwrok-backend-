import { createProjectModal } from "../../../models/professional/project/createproject.js";
import sendResponse from "../../../utility/response.js";

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
    } = req.body;

    // Required project image
    const projectImage = req.files?.projectImage?.[0];
    if (!projectImage) {
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "Project image is required"
      );
    }

    // Optional images
    const projectExecutionImg = req.files?.projectExecutionImg?.[0];
    const presentaionBoardImg = req.files?.presentaionBoardImg?.[0];
    const projectTechDocImg = req.files?.projectTechDocImg?.[0];

    const baseURL = "http://localhost:4000/uploads/project";

     const newProject = new createProjectModal({
        professionalId: req.professionalId,
        projectBasicDetail: {
        projectTitle,
        projectCategory,
        projectSubCategory,
        projectYearOfCompletion,
        projectCity,
        projectState,
        projectArea,
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
      projectImage: `${baseURL}/${projectImage.filename}`,
      ...(projectExecutionImg && {
        projectExecutionImg: `${baseURL}/${projectExecutionImg.filename}`,
      }),
      ...(presentaionBoardImg && {
        presentaionBoardImg: `${baseURL}/${presentaionBoardImg.filename}`,
      }),
      ...(projectTechDocImg && {
        projectTechDocImg: `${baseURL}/${projectTechDocImg.filename}`,
      }),
    });

    const savedProject = await newProject.save();

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
