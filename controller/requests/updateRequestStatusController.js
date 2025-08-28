import sendResponse from "../../utility/response.js";
import { clientRequestModal } from "../../models/requests/clientRequestModal.js";
import sendMail from "../../utility/mail/sendmail.js";
import { vendorSignUpModel } from "../../models/auth/professionalsignupmodel.js";
import requestAcceptedTemplate from "../../utility/mail/templets/requestaccepttemp.js";
import requestRejectedTemplate from "../../utility/mail/templets/requestrejecttemp.js";
import { ScheduledReviewMail } from "../../models/mail/scheduledReviewMail.js";

// modified with new
export const updateClientRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, estimatedQuotation, initialDesignIdea, rejectionReason } =
      req.body;

    const allowedStatuses = ["new", "accepted", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return sendResponse(res, 400, false, null, null, "Invalid status value");
    }

    const updateFields = {
      status,
    };

    if (status === "accepted") {
      if (!estimatedQuotation || !initialDesignIdea) {
        return sendResponse(
          res,
          400,
          false,
          null,
          null,
          "Missing estimatedQuotation or initialDesignIdea"
        );
      }
      updateFields.estimatedQuotation = estimatedQuotation;
      updateFields.initialDesignIdea = initialDesignIdea;
      updateFields.rejectionReason = "";
    }

    if (status === "rejected") {
      if (!rejectionReason) {
        return sendResponse(
          res,
          400,
          false,
          null,
          null,
          "Missing rejectionReason"
        );
      }
      updateFields.rejectionReason = rejectionReason;
      updateFields.estimatedQuotation = "";
      updateFields.initialDesignIdea = "";
    }

    const updatedRequest = await clientRequestModal
      .findByIdAndUpdate(id, updateFields, { new: true })
      .select(
        "clientName email clientProjectCategory clientProjectBudgetRange clientProjectTimeLine clientProjectType clientProjectLocation clientProjectServicesType createdAt status estimatedQuotation initialDesignIdea rejectionReason professionalId"
      );

    if (!updatedRequest) {
      return sendResponse(
        res,
        404,
        false,
        null,
        null,
        "Client request not found"
      );
    }

    // === Send mail logic ===
    if (status === "accepted" && updatedRequest.professionalId) {
      // Fetch professional info
      const professional = await vendorSignUpModel
        .findById(updatedRequest.professionalId)
        .select("representativeName representativeEmail representativeMobile");
       console.log("Professional Info:", professional);
      if (professional) {
        await sendMail(
          updatedRequest.email,
          "Your Request Accepted - Professional Details",
          requestAcceptedTemplate(updatedRequest.clientName, professional)
        );
        // --- Schedule review mail for 2 days later ---
        const alreadyScheduled = await ScheduledReviewMail.findOne({
          requestId: updatedRequest._id,
        });
        if (!alreadyScheduled) {
          await ScheduledReviewMail.create({
            requestId: updatedRequest._id,
            email: updatedRequest.email,
            clientName: updatedRequest.clientName,
            professional,
            professionalId: updatedRequest.professionalId,
            // sendAt: new Date(Date.now() - 60 * 1000), // 2 minute baad
            sendAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 din baad
            sent: false,
          });
        }
      }
    }

    if (status === "rejected") {
      await sendMail(
        updatedRequest.email,
        "Your Request Was Rejected",
        requestRejectedTemplate(
          updatedRequest.clientName,
          updatedRequest.rejectionReason
        )
      );
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
      rejectionReason: updatedRequest.rejectionReason,
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
