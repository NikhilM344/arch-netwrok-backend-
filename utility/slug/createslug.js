// generateSlugs.js
import mongoose from "mongoose";
import slugify from "slugify";
import connectDb from "../../configs/dbconfig.js";
import {vendorSignUpModel} from "../../models/auth/professionalsignupmodel.js"; // apna schema import karo

const generateSlugsForOldUsers = async () => {
  try {
    await connectDb();

    const profiles = await vendorSignUpModel.find({
      $or: [
        { slug: { $exists: false } },
        { slug: null },
        { slug: "" }
      ],
    });

    console.log(`Total profiles without slug: ${profiles.length}`);

    for (let profile of profiles) {
      if (profile.businessName && profile.category && profile.city) {
        profile.slug = slugify(
          `${profile.businessName}-${profile.category}-${profile.city}`,
          { lower: true }
        );
        await profile.save();
        console.log(`Slug created for: ${profile.businessName}`);
      }
    }

    console.log("✅ Slugs generated for old users.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error generating slugs:", error);
    process.exit(1);
  }
};

generateSlugsForOldUsers();
