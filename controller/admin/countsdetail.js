import { vendorSignUpModel } from "../../models/auth/vendorsignupmodle.js";
import { userSignUpModle } from "../../models/auth/usersignupmodle.js";
import { clientRequestModal } from "../../models/requests/clientRequestModal.js";
import sendResponse from "../../utility/response.js";

export const countDetail = async (req, res) => {
  try {
    const professionalCount = await vendorSignUpModel.countDocuments({});
    const userCount = await userSignUpModle.countDocuments({});
    const totalCount = professionalCount + userCount;
    // fillter counting
    const PendingApprovals  = await vendorSignUpModel.countDocuments({ isVerifiedByAdmin: false });
    const Connections = await clientRequestModal.countDocuments({ status: "accepted" });
    const countingDetails = {
      totalProfessionals: professionalCount,
      totalClient: userCount,
      totalUsers: totalCount,
      PendingApprovals: PendingApprovals,
      Connections:Connections
    }
     
    return sendResponse(
      res,
      200,
      true,
      countingDetails,
      null,
      "Counts fetched successfully"
    );
  } catch (error) {
    console.log("error", error);
  }
};
