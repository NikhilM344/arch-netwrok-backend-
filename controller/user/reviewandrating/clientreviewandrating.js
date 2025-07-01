import { reviewModel } from "../../../models/user/reviewandrating/clientreviewandrating.js";
import { updateProfessionalReviewsandRating } from "../../../utility/professional/updatereviews.js";
import sendResponse from "../../../utility/response.js";

export const createReview = async (req, res) => {
  try {
    const { professionalId, rating, comment } = req.body;
    const userId = req.userId;
    const reviewCreationPayload = {
      clientId: userId,
      professionalId,
      rating,
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
        "Your Review SuccessFully Goes To Professional"
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
