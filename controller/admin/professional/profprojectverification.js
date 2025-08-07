import { createProjectModal } from "../../../models/professional/project/createproject.js";
import { vendorSignUpModel } from "../../../models/auth/vendorsignupmodle.js";
import sendMail from "../../../utility/mail/sendmail.js";
import projectRejectedTemplate from "../../../utility/mail/templets/project.rejection.templete.js";
import projectAcceptedTemplate from "../../../utility/mail/templets/project.accept.templete.js";
import sendResponse from "../../../utility/response.js";

export const profProVeriforPublicationByAdmin = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Bad Request",
        "Project Id is required"
      );
    }

    const { status, rejectionReason } = req.body;
    const allowedStatuses = ["accepted", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return sendResponse(res, 400, false, null, null, "Invalid status value");
    }

    // Database update
    const updateFields = {
      isPublished: status === "accepted",
      isPublishedRejection: status === "rejected" ? rejectionReason : "",
    };

    const updatedProjectStatus = await createProjectModal
      .findByIdAndUpdate(projectId, updateFields, { new: true })
      .select("isPublished projectBasicDetail.projectTitle professionalId isPublishedRejection")
      .lean();

        

    if (!updatedProjectStatus) {
      return sendResponse(res, 404, false, null, null, "Project Not Found");
    }

    // ----------- Response पहले भेज दो -------------
    sendResponse(
      res,
      200,
      true,
      updatedProjectStatus,
      null,
      "Project Publication status updated successfully"
    );

    const professionalDetail = await vendorSignUpModel.findById({_id:updatedProjectStatus.professionalId}).select("fullName email")
      .lean();
    console.log("professional detail",professionalDetail);

   // background requeste
    (async () => {
      try {
        if (status === "accepted") {
          await sendMail(
            professionalDetail.email,
            "Your Project Publication Verification",
            projectAcceptedTemplate(professionalDetail.fullName,updatedProjectStatus.projectBasicDetail.projectTitle)
          );
        } else if (status === "rejected") {
          await sendMail(
            professionalDetail.email,
            "Your Project Publication Rejected By Admin",
            projectRejectedTemplate(
              professionalDetail.fullName,
              updatedProjectStatus.isPublishedRejection
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
