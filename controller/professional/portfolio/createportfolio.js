import { createPortfolioModal } from "../../../models/professional/portfolio/createportfolio.js";
import sendResponse from "../../../utility/response.js";
import enviormentConfig from "../../../configs/enviorment.js";
export const createPortfolio = async (req, res) => {
  try {
    const {
      portfolioTitle,
      buildingType,
      portfolioLocation,
      portfolioDescription,
      projectCompletionYear,
      isFeatured,
    } = req.body;

    const imageFile = req.files?.portfolioImage?.[0];
    const professionalId = req.professionalId;

    if (!professionalId) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Professional ID is required",
        "Validation failed"
      );
    }

    if (!imageFile) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Portfolio image is required",
        "Validation failed"
      );
    }

    const imageUrl = `${enviormentConfig.backendBaseUrl}uploads/personalPortfolio/${imageFile.filename}`;

    const newPortfolio = await createPortfolioModal.create({
      portfolioTitle,
      buildingType,
      portfolioLocation,
      portfolioDescription,
      projectCompletionYear,
      professionalId,
      portfolioImage: imageUrl,
      isFeatured,
    });

    return sendResponse(
      res,
      201,
      true,
      newPortfolio,
      null,
      "Portfolio created successfully"
    );
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

    return sendResponse(
      res,
      500,
      false,
      null,
      error.message,
      "Failed to create portfolio"
    );
  }
};

