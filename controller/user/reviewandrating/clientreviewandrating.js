import { reviewModel } from "../../../models/user/reviewandrating/clientreviewandrating.js";
import { updateProfessionalReviewsandRating } from "../../../utility/professional/updatereviews.js";
import sendResponse from "../../../utility/response.js";
import { clientRequestModal } from "../../../models/requests/clientRequestModal.js";

export const createReview = async (req, res) => {
  try {
    const { professionalId, rating, comment, requestId } = req.body;

    // requestId se clientId nikaalo
    let clientId = null;
    if (requestId) {
      const request = await clientRequestModal.findById(requestId).select("clientId");
      if (!request) {
        return sendResponse(res, 404, false, null, null, "Invalid requestId");
      }
      clientId = request.clientId;
    }

    const reviewCreationPayload = {
      professionalId,
      rating,
      requestId,
      clientId, 
    };

    if (comment) {
      reviewCreationPayload.comment = comment;
    }

    const createdReview = await reviewModel.create(reviewCreationPayload);
    if (createdReview) {
      await updateProfessionalReviewsandRating(professionalId);

      sendResponse(
        res,
        200,
        true,
        createdReview,
        null,
        "Your Review Successfully Goes To Professional"
      );
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return sendResponse(
        res,
        400,
        false,
        null,
        errors[0],
        "Validation failed"
      );
    }
    if (error.code === 11000) {
      return sendResponse(
        res,
        400,
        false,
        null,
        error.keyValue,
        "Only One Time Give Review To Particular Professional"
      );
    }
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

export const getProfessionalReviews = async (req, res) => {
  try {
    const  professionalId  = req.professionalId; // ya req.query ya req.body, jahan se bhi aa rahi ho

    const reviews = await reviewModel.find({ professionalId })
      .populate({
        path: "requestId",
        select: "clientProjectType clientProjectCategory",
      })
      .populate({
        path: "clientId",
        select: "email firstName lastName",
      })
      .populate({
        path: "professionalId",
        select: "avgRating totalReview fullName",
      })
      .sort({ createdAt: -1 });

    sendResponse(res, 200, true, reviews, null, "Reviews fetched successfully");
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      null,
      error.message || "Something went wrong",
      "Internal Server Error"
    );
  }
};