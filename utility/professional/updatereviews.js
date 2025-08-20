import { reviewModel } from "../../models/user/reviewandrating/clientreviewandrating.js";
import { vendorSignUpModel } from "../../models/auth/professionalsignupmodel.js";
import mongoose from "mongoose";

export const updateProfessionalReviewsandRating = async (professionalId) => {
   const objectId = new mongoose.Types.ObjectId(professionalId);

  try {
    const result = await reviewModel.aggregate([
      { $match: { professionalId:objectId } },
      {
        $group: {
          _id: "professionalId",
          avgRating: { $avg: "$rating" },
          totalReview: { $sum: 1 },
        },
      },
    ]);
   
    if (result.length > 0) {
      await vendorSignUpModel.findByIdAndUpdate(professionalId, {
        avgRating: result[0].avgRating,
        totalReview: result[0].totalReview,
      });
    } else {
      await vendorSignUpModel.findByIdAndUpdate(professionalId, {
        avgRating: 0,
        totalReview: 0,
      });
    }
  } catch (error) {
    console.log("error update review", error);
  }
};
