// client detail api
import sendResponse from "../../../utility/response.js";
import { userSignUpModle } from "../../../models/auth/usersignupmodle.js";

export const fetchClientDetailForAdmin = async (req, res) => {
  try {
    // query param se search term lo
    const search = req.query.search || '';

    // filter object banao
    const filter = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {}; // agar search empty ho toh sab records laao

    // DB query
    const fetchClientDetails = await userSignUpModle
      .find(filter)
      .select("-password -__v -updatedAt -role")
      .sort({ createdAt: -1 })
      .lean();

    // agar data nahi mila
    if (fetchClientDetails.length === 0) {
      return sendResponse(
        res,
        404,
        false,
        null,
        "No client details found",
        "No clients registered yet"
      );
    }

    // modify karna
    const modifiedClientDetails = fetchClientDetails.map((client) => {
      return {
        id: client._id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        createdAt: client.createdAt.toISOString().split("T")[0],
      };
    });

    return sendResponse(
      res,
      200,
      true,
      modifiedClientDetails,
      null,
      "Client details fetched successfully"
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message,
      "Failed to fetch client details"
    );
  }
};

