import sendResponse from "../../utility/response.js";
import { vendorSignUpModel } from "../../models/auth/vendorsignupmodle.js";
import { userSignUpModle } from "../../models/auth/usersignupmodle.js";
import { reviewModel } from "../../models/user/reviewandrating/clientreviewandrating.js";
export const fetchUserProfessionlProfile = async (req, res) => {
  try {
    const { role, id } = req.userInfo;
    if (!role) {
      sendResponse(res, 401, false, null, null, "You Are Not Authoraized");
      return;
    }
    if (role === "professional") {
      const userInfo = await vendorSignUpModel
        .find({ _id: id })
        .select(
          "-__v -password -agreeTerms -portfolio -mobileNumber -licenseImage -role -gstNumber"
        )
      if (!userInfo) {
        sendResponse(res, 500, false, null, null, "Database is Down");
        return;
      }
      sendResponse(
        res,
        200,
        true,
        userInfo,
        null,
        "fetch user info successfully"
      );
    } else {
      const userInfo = await userSignUpModle
        .find({ _id: id })
        .select("-__v -password -role");
      if (!userInfo) {
        sendResponse(res, 500, false, null, null, "Database is Down");
        return;
      }
      sendResponse(
        res,
        200,
        true,
        userInfo,
        null,
        "fetch user info successfully"
      );
    }
  } catch (error) {
    // Validation Error Handling
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return sendResponse(res, 400, false, null, messages, "Validation Error");
    }
    // Duplicate Key Error Handling
    if (error.code === 11000) {
      return sendResponse(
        res,
        400,
        false,
        null,
        error.keyValue,
        "Duplicate field value entered"
      );
    }
    // Internal Server Error (default)
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message || "Something went wrong",
      "Internal Server Error"
    );
  }
};
