import sendResponse from "../../../utility/response.js";
import { createProjectModal } from "../../../models/professional/project/createproject.js";

const professionalProjectDetailProvideByAdmin = async (req, res) => {
  try {
    const { professionalId } = req.params;

    // STEP 1: Get page and limit from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    // STEP 2: Calculate skip
    const skip = (page - 1) * limit;

    if (!professionalId) {
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "If You Want Fetch Project Detail Send Professional Detail"
      );
    }

    // STEP 3: Get paginated data
    const professionalProjectDetail = await createProjectModal
      .find({ professionalId })
      .select("-__v")
      .skip(skip)
      .limit(limit)
      .lean();

    // STEP 4: Get total count for pagination info
    const total = await createProjectModal.countDocuments({ professionalId });

    if (!professionalProjectDetail || professionalProjectDetail.length === 0) {
      return sendResponse(
        res,
        200,
        false,
        [],
        null,
        "Through This Professional Not Create Any Project"
      );
    }

    // STEP 5: Format response
    const modifiedResponse = professionalProjectDetail.map((doc) => {
      const { _id, ...rest } = doc;
      return {
        id: _id,
        ...rest,
      };
    });

    const response = {
      data: modifiedResponse,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    return sendResponse(res, 200, true, response, null, "Data fetched successfully");
  } catch (error) {
    console.log("error occur in professional project detail api", error);
    return sendResponse(res, 500, false, null, error.message, "Internal Server Error");
  }
};

export default professionalProjectDetailProvideByAdmin;
