import sendResponse from "../../utility/response.js";
import { clientRequestModal } from "../../models/requests/clientRequestModal.js";

export const clientRequestList = async (req, res) => {
  try {
    // MongoDB query: find all requests for this professionalId
    const extractedReq = await clientRequestModal
      .find({ professionalId: req.professionalId })
      .select(
        "clientName clientPhoneNumber email clientProjectCategory clientProjectBudgetRange clientProjectTimeLine clientProjectType clientProjectLocation clientProjectServicesType createdAt status"
      );
    // If no data found
    if (!extractedReq || extractedReq.length === 0) {
      return sendResponse(
        res,
        404,
        false,
        [],
        null,
        "No client requests found"
      );
    }

    // Transform extractedReq
    const transformedReq = extractedReq.map((item) => ({
      id: item._id, // change _id to id
      clientName: item.clientName,
      email: item.email,
      clientProjectCategory: item.clientProjectCategory,
      clientProjectBudgetRange: item.clientProjectBudgetRange,
      clientProjectTimeLine: item.clientProjectTimeLine,
      clientProjectType: item.clientProjectType,
      clientProjectLocation: item.clientProjectLocation,
      clientProjectServicesType: item.clientProjectServicesType,
      clientPhoneNumber:item.clientPhoneNumber,
      createdAt: item.createdAt,
      status: item.status,
    }));


    // Success response
    return sendResponse(
      res,
      200,
      true,
      transformedReq,
      null,
      "Client requests fetched successfully"
    );
  } catch (error) {
    console.error("Error in clientRequestList:", error);

    // Validation Error Handling
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return sendResponse(res, 400, false, null, messages, "Validation Error");
    }

    // Duplicate Key Error Handling
    if (error.code === 11000) {
      return sendResponse(
        res,
        400,
        false,
        null,
        error.keyValue,
        "Duplicate field value entered"
      );
    }

    // Internal Server Error (default)
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message || "Something went wrong",
      "Internal Server Error"
    );
  }
};
