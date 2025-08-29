import sendResponse from "../../../utility/response.js";
import { createProjectModal } from "../../../models/professional/project/createproject.js";

export const fetchProjectDetails = async (req, res) => {
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
  try {
    const projectDetails = await createProjectModal.findById(id).lean();
    if (!projectDetails) {
      return sendResponse(res, 404, false, null, null, "Project Not Found");
    }
    return sendResponse(
      res,
      200,
      true,
      projectDetails,
      null,
      "Project details fetched successfully"
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message,
      "Failed to fetch project details"
    );
  }
};
