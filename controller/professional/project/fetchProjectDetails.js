import sendResponse from "../../../utility/response.js";
import { createProjectModal } from "../../../models/professional/project/createproject.js";
import dayjs from "dayjs";
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
    const projectDetails = await createProjectModal
    .findById(id)
    .populate(
     {path:"professionalId",select: "representativeName representativePhoto slug"}
    )
    
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

export const fetchUnpublishedProjects = async (req, res) => {
  try {
    // sirf isPublished:false projects, latest first
    const projects = await createProjectModal
      .find({ isPublished: false })
      .sort({ createdAt: -1 })
      .populate({
        path: "professionalId",
        select: "representativeName",
      }).select("projectBasicDetail.projectTitle createdAt professionalId")

    // agar koi project nahi mila
    if (!projects || projects.length === 0) {
      return sendResponse(
        res,
        404,
        false,
        null,
        null,
        "No unpublished projects found"
      );
    }

    // output ko required format mein map karo
    const formatted = projects.map((p) => {
      const date = dayjs(p.createdAt).format("YYYY-MM-DD");
      const time = dayjs(p.createdAt).format("hh:mm A");
      return {
        id: p._id,
        projectTitle: p.projectBasicDetail.projectTitle,
        representativeName: p.professionalId?.representativeName || "",
        Date: date,
        time: time,
      };
    });

    return sendResponse(
      res,
      200,
      true,
      formatted,
      null,
      "Unpublished projects fetched successfully"
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message,
      "Failed to fetch unpublished projects"
    );
  }
};

