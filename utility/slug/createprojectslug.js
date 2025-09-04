// generateSlugs.js
import mongoose from "mongoose";
import slugify from "slugify";
import connectDb from "../../configs/dbconfig.js";
import { createProjectModal } from "../../models/professional/project/createproject.js";

const generateProjectSlugsForOldUsers = async () => {
  try {
    await connectDb();

    const projects = await createProjectModal.find({
      $or: [{ slug: { $exists: false } }, { slug: null }, { slug: "" }],
    });

    console.log(`Total projects without slug: ${projects.length}`);

    for (let project of projects) {
      if (
        project.projectBasicDetail?.projectTitle &&
        project.projectBasicDetail?.projectCategory &&
        project.projectBasicDetail?.projectCity
      ) {
        project.projectBasicDetail.slug = slugify(
          `${project.projectBasicDetail.projectTitle}-${project.projectBasicDetail.projectCategory}-${project.projectBasicDetail.projectCity}`,
          { lower: true, strict: true }
        );

        await project.save();
        console.log(`✅ Slug created for: ${project.projectBasicDetail.projectTitle}`);
      }
    }

    console.log("🎉 Slugs generated for old projects.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error generating slugs:", error);
    process.exit(1);
  }
};

generateProjectSlugsForOldUsers();
