import sendResponse from "../../../utility/response.js";
import { createProjectModal } from "../../../models/professional/project/createproject.js";
import { createPortfolioModal } from "../../../models/professional/portfolio/createportfolio.js";
import { clientRequestModal } from "../../../models/requests/clientRequestModal.js";
import { vendorSignUpModel } from "../../../models/auth/professionalsignupmodel.js";
import { reviewModel } from "../../../models/user/reviewandrating/clientreviewandrating.js";

export const professionalDeleteAccount = async (req, res) => {
  const { id } = req.userInfo;
  try {
    if (!id) {
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "Resource Not Found Id Is Mandatory For Account Delation"
      );
    }
    const deletedProfessional = await vendorSignUpModel.findByIdAndDelete(id);
    if (!deletedProfessional) {
      return sendResponse(
        res,
        404,
        false,
        null,
        null,
        "Professional not found"
      );
    }
    await createProjectModal.deleteMany({ professionalId: id });
    await createPortfolioModal.deleteMany({ professionalId: id });
    await clientRequestModal.deleteMany({ professionalId: id });
    await reviewModel.deleteMany({ professionalId: id });

    return sendResponse(
      res,
      200,
      true,
      null,
      null,
      "Your account and all associated data (projects, portfolios, leads, and reviews) have been deleted successfully."
    );
  } catch (error) {
    console.log("error while occur in delete api", error);
    sendResponse(res, 500, true, null, null, error.message);
  }
};
