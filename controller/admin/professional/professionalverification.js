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

    // Database update
    const updateFields = {
      isVerifiedByAdmin: status === "accepted",
      isVerificationRejectionReason:
        status === "rejected" ? rejectionReason : ""
    };

    const updatedRegistrationStatus = await vendorSignUpModel
      .findByIdAndUpdate(id, updateFields, { new: true })
      .select("fullName email isVerificationRejectionReason")
      .lean();

    if (!updatedRegistrationStatus) {
      return sendResponse(res, 404, false, null, null, "Professional not found");
    }

    // ----------- Response पहले भेज दो -------------
    sendResponse(
      res,
      200,
      true,
      updatedRegistrationStatus,
      null,
      "Verification status updated successfully"
    );

    // ----------- Background Email भेजो -------------
    (async () => {
      try {
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
      } catch (err) {
        console.error("Background email sending failed:", err.message);
      }
    })();
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message,
      "Internal server error"
    );
  }
};
