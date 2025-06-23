import sendResponse from "../../utility/response.js";
import { clientRequestModal } from "../../models/requests/clientRequestModal.js";

export const clientRequestListForClientWithStatus = async (req, res) => {
  try {
    const extractedReq = await clientRequestModal
      .find({ clientId: req.userId })
      .populate({
        path: "professionalId",
        select: "fullName"
      })
      .select("-__v");
    if (!extractedReq) {
      sendResponse(res, 200, true, [], null, "Not Created Any Request");
      return;
    }
    const transformedReq = extractedReq.map((item) => ({
      id: item._id,
      clientName: item.clientName,
      email: item.email,
      clientProjectCategory: item.clientProjectCategory,
      clientProjectBudgetRange: item.clientProjectBudgetRange,
      clientProjectTimeLine: item.clientProjectTimeLine,
      clientProjectType: item.clientProjectType,
      clientProjectLocation: item.clientProjectLocation,
      clientProjectServicesType: item.clientProjectServicesType,
      clientProjectDetail: item.clientProjectDetail,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      status: item.status,
      providerName: item.professionalId?.fullName || "",
      // conditionally add fields based on status
      ...(item.status === "accepted" && {
        estimatedQuotation: item.estimatedQuotation,
        initialDesignIdea: item.initialDesignIdea,
      }),
      ...(item.status === "rejected" && {
        rejectionReason: item.rejectionReason,
      }),
    }));

    sendResponse(
      res,
      200,
      true,
      transformedReq,
      null,
      "requests fetch successfully"
    );
  } catch (error) {
    console.error("Error in updateClientRequestStatus:", error);

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
