import sendResponse from "../../../utility/response.js";

const professionalVerificationByAdmin = async (req, res) => {
  try {
    const professionalId = req.params;
    if (!professionalId) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Bad Request",
        "Profession Id Is Required For Verification Status Update"
      );
    }
    const { status, rejectionRejection } = req.body;
    const allowedStatuses = [accepted, rejected];
    if (!allowedStatuses.includes(status)) {
      return sendResponse(res, 400, false, null, null, "Invalid status value");
    }
    const updateFields = {
        status
    }
    if(status==="accepted"){
        updateFields.status = true;
        updateFields.isVerificationRejectionReason = ""
    }

    if(status === "rejected"){
        updateFields.status = false
        updateFields.isVerificationRejectionReason = rejectionRejection
    }
    
  } catch (error) {}
};
