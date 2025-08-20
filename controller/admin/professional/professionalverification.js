
import { vendorSignUpModel } from "../../../models/auth/professionalsignupmodel.js";
import sendMail from "../../../utility/mail/sendmail.js";
import registrationRejectedTemplate from "../../../utility/mail/templets/registrationrejectiontemplete.js";
import registrationVerifiedTemplate from "../../../utility/mail/templets/registrationverificationtemplete.js";
import sendResponse from "../../../utility/response.js";

// modified with new
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
        status === "rejected" ? rejectionReason : "",
    };

    const updatedRegistrationStatus = await vendorSignUpModel
      .findByIdAndUpdate(id, updateFields, { new: true })
      .select("representativeName representativeEmail isVerificationRejectionReason")
      .lean();

    if (!updatedRegistrationStatus) {
      return sendResponse(
        res,
        404,
        false,
        null,
        null,
        "Professional not found"
      );
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
            updatedRegistrationStatus.representativeEmail,
            "Your Registration Verification Completed",
            registrationVerifiedTemplate(updatedRegistrationStatus.representativeName)
          );
        } else if (status === "rejected") {
          await sendMail(
            updatedRegistrationStatus.representativeEmail,
            "Your Registration Verification Rejected By Admin",
            registrationRejectedTemplate(
              updatedRegistrationStatus.representativeName,
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
