// deleteSlugs.js
import mongoose from "mongoose";
import connectDb from "../../configs/dbconfig.js";
import { createProjectModal } from "../../models/professional/project/createproject.js";

const deleteSlugs = async () => {
  try {
    await connectDb();

    const result = await createProjectModal.updateMany(
      {}, // sabhi documents par apply hoga
      { $unset: { slug: "" } }
    );

    console.log(`🗑️ Slugs deleted for ${result.modifiedCount} projects`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error deleting slugs:", error);
    process.exit(1);
  }
};

deleteSlugs();
