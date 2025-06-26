import { createPortfolioModal } from "../../../models/professional/portfolio/createportfolio.js";
import sendResponse from "../../../utility/response.js";

export const fetchPortfolio = async (req, res) => {
  try {
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

    const fetchedPortfolios = await createPortfolioModal
      .find({ professionalId })
      .populate("professionalId", "fullName") // agar tumhe naam bhi chahiye
      .lean();

    const transformedPortfolios = fetchedPortfolios.map((item) => ({
      id: item._id,
      portfolioTitle: item.portfolioTitle,
      buildingType: item.buildingType,
      portfolioLocation: item.portfolioLocation,
      portfolioDescription: item.portfolioDescription,
      projectCompletionYear: item.projectCompletionYear,
      isFeatured: item.isFeatured,
      portfolioImage: item.portfolioImage,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      professionalName: item.professionalId?.fullName || "",
      ...(item.isFeatured && { featuredNote: "This is a featured project" }),
    }));

    return sendResponse(
      res,
      200,
      true,
      transformedPortfolios,
      null,
      "Portfolios fetched successfully"
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      null,
      error.message,
      "Failed to fetch portfolios"
    );
  }
};

