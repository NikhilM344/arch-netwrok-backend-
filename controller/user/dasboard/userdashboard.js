import sendResponse from "../../../utility/response.js";
import { clientRequestModal } from "../../../models/requests/clientRequestModal.js";

export const userDashboardCountingAndDetails = async (req, res) => {
  try {
    const totalSendReqCount = await clientRequestModal.countDocuments({
      clientId: req.userId,
    });
    const pendingReqCount = await clientRequestModal.countDocuments({
      clientId: req.userId,
      status: "pending",
    });
    const acceptedReqCount = await clientRequestModal.countDocuments({
      clientId: req.userId,
      status: "accepted",
    });
    const acceptedAndPendingRequestCount =
      await clientRequestModal.countDocuments({
        clientId: req.userId,
        status: { $in: ["accepted", "pending"] },
      });

    sendResponse(
      res,
      200,
      true,
       {
        TotalRequests: totalSendReqCount,
        pendingRequestCount: pendingReqCount,
        acceptedRequestCount: acceptedReqCount,
        ActiveProjects: acceptedAndPendingRequestCount,
      },
      null,
      "Your dashboard details have been loaded successfully"
    );
  } catch (error) {
    sendResponse(res, 500, false, null, null, error.message);
  }
};
