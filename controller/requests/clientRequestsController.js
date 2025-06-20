import {clientRequestModal} from "../../models/requests/clientRequestModal.js";
import sendResponse from "../../utility/response.js";

const clientRequestHandler = async (req, res) => {
  try {
    const {
      clientId,
      professionalId,
      clientName,
      clientProjectType,
      clientProjectCategory,
      clientProjectServicesType,
      clientProjectBudgetRange,
      clientProjectTimeLine,
      clientProjectLocation,
      clientProjectDetail,
      clientProjectSpecificRequirements,
      clientPhoneNumber,
      email,
    } = req.body;

    const requestData = {
      clientId,
      professionalId,
      clientName,
      clientProjectType,
      clientProjectCategory,
      clientProjectServicesType,
      clientProjectBudgetRange,
      clientProjectTimeLine,
      clientProjectLocation,
      clientProjectDetail,
      clientPhoneNumber,
      email,
    };

    if (clientProjectSpecificRequirements) {
      requestData.clientProjectSpecificRequirements =
        clientProjectSpecificRequirements;
    }

    const newRequest = new clientRequestModal(requestData);
    await newRequest.save();

    return sendResponse(
      res,
      201,
      true,
      newRequest,
      null,
      "Client request submitted successfully",
    );
  } catch (error) {
    console.error("Error in clientRequestHandler:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return sendResponse(res, 400, false, null, messages,"validation error");
    }
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
    return sendResponse(res, 500, false, null,null,"Internal Server Error");
  }
};

export default clientRequestHandler;
