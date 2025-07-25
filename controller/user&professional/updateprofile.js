import { userSignUpModle } from "../../models/auth/usersignupmodle.js";
import sendResponse from "../../utility/response.js";

export const updateProfile = async (req, res) => {
  try {
    const { role, id } = req.userInfo;
    const { firstName, lastName, email, phone, address } = req.body;

    if (!role || !id) {
      return sendResponse(res, 400, false, null, null, "You are not authenticated");
    }

    if (role !== "user") {
      return sendResponse(res, 403, false, null, null, "Unauthorized access");
    }

    const updatePayload = {};
    if (firstName) updatePayload.firstName = firstName;
    if (lastName) updatePayload.lastName = lastName;
    if (email) updatePayload.email = email;
    if (phone) updatePayload.phone = phone;
    if (address) updatePayload.address = address;

    const updatedData = await userSignUpModle.findByIdAndUpdate(
      id,
      { $set: updatePayload },
      { new: true }
    ).lean();

    if (!updatedData) {
      return sendResponse(res, 500, false, null, null, "Server busy, please try again");
    }

    return sendResponse(res, 200, true, updatedData, null, "Your profile updated successfully");
  } catch (error) {
    console.error("Error while updating profile:", error);
    return sendResponse(res, 500, false, null, error.message, "Something went wrong");
  }
};
