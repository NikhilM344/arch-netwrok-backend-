import { vendorSignUpModel } from "../../../models/auth/vendorsignupmodle.js";
import sendMail from "../../../utility/mail/sendmail.js";
import registrationRejectedTemplate from "../../../utility/mail/templets/registrationrejectiontemplete.js";
import registrationVerifiedTemplate from "../../../utility/mail/templets/registrationverificationtemplete.js";
import sendResponse from "../../../utility/response.js";

export const professionalVerificationByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Bad Request",
        "Professional Id is required"
      );
    }

    const { status, rejectionReason } = req.body;
    const allowedStatuses = ["accepted", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return sendResponse(res, 400, false, null, null, "Invalid status value");
    }

    const updateFields = {
      isVerifiedByAdmin: status==="accepted" ? true : false,
      isVerificationRejectionReason: status === "rejected" ? rejectionReason : ""
    };

    const updatedRegistrationStatus = await vendorSignUpModel
      .findByIdAndUpdate(id, updateFields, { new: true })
      .select("fullName email isVerificationRejectionReason")
      .lean();

    if (!updatedRegistrationStatus) {
      return sendResponse(res, 404, false, null, null, "Professional not found");
    }

    // send email notification
    if (status === "accepted") {
      await sendMail(
        updatedRegistrationStatus.email,
        "Your Registration Verification Completed",
        registrationVerifiedTemplate(updatedRegistrationStatus.fullName)
      );
    } else if (status === "rejected") {
      await sendMail(
        updatedRegistrationStatus.email,
        "Your Registration Verification Rejected By Admin",
        registrationRejectedTemplate(
          updatedRegistrationStatus.fullName,
          updatedRegistrationStatus.isVerificationRejectionReason
        )
      );
    }

    return sendResponse(
      res,
      200,
      true,
      updatedRegistrationStatus,
      null,
      "Verification status updated successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message, "Internal server error");
  }
};
