import sendResponse from "../../utility/response.js";
import { clientRequestModal } from "../../models/requests/clientRequestModal.js";

 export const updateClientRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
     console.log("this is id",typeof(id),id);
    const { status, estimatedQuotation, initialDesignIdea, rejectionReason } = req.body;

    const allowedStatuses = ['new', 'accepted', 'rejected'];
    if (!allowedStatuses.includes(status)) {
      return sendResponse(res, 400, false, null, null, "Invalid status value");
    }

    const updateFields = {
      status
    };

    if (status === 'accepted') {
      if (!estimatedQuotation || !initialDesignIdea) {
        return sendResponse(res, 400, false, null, null, "Missing estimatedQuotation or initialDesignIdea");
      }
      updateFields.estimatedQuotation = estimatedQuotation;
      updateFields.initialDesignIdea = initialDesignIdea;
      updateFields.rejectionReason = ""; // clear rejectionReason if accepting
    }

    if (status === 'rejected') {
      if (!rejectionReason) {
        return sendResponse(res, 400, false, null, null, "Missing rejectionReason");
      }
      updateFields.rejectionReason = rejectionReason;
      updateFields.estimatedQuotation = ""; // clear quotation if rejected
      updateFields.initialDesignIdea = "";  // clear idea if rejected
    }

    const updatedRequest = await clientRequestModal.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    ).select("clientName email clientProjectCategory clientProjectBudgetRange clientProjectTimeLine clientProjectType clientProjectLocation clientProjectServicesType createdAt status estimatedQuotation initialDesignIdea rejectionReason");

    if (!updatedRequest) {
      return sendResponse(res, 404, false, null, null, "Client request not found");
    }

    const responsePayload = {
      id: updatedRequest._id,
      clientName: updatedRequest.clientName,
      email: updatedRequest.email,
      clientProjectCategory: updatedRequest.clientProjectCategory,
      clientProjectBudgetRange: updatedRequest.clientProjectBudgetRange,
      clientProjectTimeLine: updatedRequest.clientProjectTimeLine,
      clientProjectType: updatedRequest.clientProjectType,
      clientProjectLocation: updatedRequest.clientProjectLocation,
      clientProjectServicesType: updatedRequest.clientProjectServicesType,
      createdAt: updatedRequest.createdAt,
      status: updatedRequest.status,
      estimatedQuotation: updatedRequest.estimatedQuotation,
      initialDesignIdea: updatedRequest.initialDesignIdea,
      rejectionReason: updatedRequest.rejectionReason
    };

    return sendResponse(
      res,
      200,
      true,
      responsePayload,
      null,
      "Client request status updated successfully"
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



