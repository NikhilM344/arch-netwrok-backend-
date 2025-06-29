import { createProjectModal } from "../../../models/professional/project/createproject.js";
import sendResponse from "../../../utility/response.js";

export const fetchProfessionalProjects = async (req, res) => {
  const professionalId = req.professionalId;

  if (!professionalId) {
    return sendResponse(
      res,
      400,
      false,
      null,
      null,
      "Professional ID is required"
    );
  }

  try {
    const projects = await createProjectModal
      .find({ professionalId })
      .lean(); // lean for plain objects

    const transformedProjects = projects.map((item) => ({
      id: item._id.toString(),
      projectBasicDetail: item.projectBasicDetail,
      projectNarritveAndDesc: item.projectNarritveAndDesc,
      projectTt: item.projectTt,
      projectImage: item.projectImage,
      projectExecutionImg: item.projectExecutionImg || null,
      presentaionBoardImg: item.presentaionBoardImg || null,
      projectTechDocImg: item.projectTechDocImg || null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      isDraft:item.isDraft,
      isPublished:item.isPublished,
      tagsAndControl:item.tagsAndControl,
      isFeatured:item.isFeatured
    }));

    return sendResponse(
      res,
      200,
      true,
      transformedProjects,
      null,
      "Projects fetched successfully"
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message,
      "Failed to fetch projects"
    );
  }
};

export default fetchProfessionalProjects;
