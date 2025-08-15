import sendResponse from "../../../utility/response.js";
import { clientRequestModal } from "../../../models/requests/clientRequestModal.js";
import { vendorSignUpModel } from "../../../models/auth/vendorsignupmodle.js";

const professionalDashboardInfo = async (req, res) => {
  try {
    const professionalId = req.professionalId;
    if (!professionalId) {
      return sendResponse(
        res,
        400,
        false,
        null,
        null,
        "ProfessionalId Not Found Please Try After Login"
      );
    }
    // extract total leads
    const requestsCount = await clientRequestModal.countDocuments({
      professionalId,
    });
    // extract total leadsaccept count
    const leadsConversionCount = await clientRequestModal.countDocuments({
      status: "accepted",
    });

    // extract avg rating and project count
    const profProjectCountandAvgRatingCount = await vendorSignUpModel
      .findById({ _id: professionalId })
      .select("isProjectCount avgRating");

    // make final payload for send response
    const payload = {
      totalLeads: requestsCount,
      totalLeadsConversion: leadsConversionCount,
      totalProjectsCount: profProjectCountandAvgRatingCount.isProjectCount,
      avgRating: profProjectCountandAvgRatingCount.avgRating,
    };
    return sendResponse(
      res,
      200,
      true,
      payload,
      null,
      "Fetch Dashboard Info SuccessFuully"
    );
  } catch (error) {
    sendResponse(res, 500, false, null, null, error.message);
  }
};

export default professionalDashboardInfo;
