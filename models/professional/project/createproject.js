import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const professionalProjectBasicDetail = new Schema({
  projectTitle: {
    type: String,
    maxlength: [30, "ProjectTitle Only Contains 30 Characters"],
    minlength: [3, "ProjectTitle long Should be 3 Characters"],
    trim: true,
    required: [true, "ProjectTitle Is Required"],
  },
  projectCategory: {
    type: String,
    maxlength: [30, "ProjectCategory Only Contains 30 Characters"],
    minlength: [3, "ProjectCategory long Should be 3 Characters"],
    trim: true,
    required: [true, "ProjectCategory Is Required"],
  },
  projectSubCategory: {
    type: String,
    maxlength: [30, "ProjectSubCategory Only Contains 30 Characters"],
    minlength: [3, "ProjectSubCategory long Should be 3 Characters"],
    trim: true,
    required: [true, "ProjectSubCategory Is Required"],
  },
  projectYearOfCompletion: {
    type: Number,
    trim: true,
    required: [true, "ProjectYearofCompletion Is Required"],
  },
  projectCity: {
    type: String,
    trim: true,
    requird: [true, "city is required"],
  },
  projectState: {
    type: String,
    trim: true,
    requird: [true, "state is required"],
  },
  projectArea: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    unit: {
      type: String,
      enum: ["sqft", "sqm"],
      default: "sqft",
    },
  },
  projectStatus: {
    type: String,
    enum: ["Built", "Unbuilt", "InProgress"],
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
});

const professionalProjectnarativeDetails = new Schema({
  projectObjectives: {
    type: String,
    maxlength: [400, "projectObjectives Only Contains 400 Characters"],
    minlength: [10, "projectObjectives long Should be 10 Characters"],
    trim: true,
    required: [true, "projectObjectives Is Required"],
  },
  projectDesignApproach: {
    type: String,
    maxlength: [400, "projectDesignApproach Only Contains 400  Characters"],
    minlength: [10, "projectDesignApproach long Should be 10 Characters"],
    trim: true,
    required: [true, "projectDesignApproach Is Required"],
  },
  projectHighLights: {
    type: String,
    maxlength: [600, "projectHighLights Only Contains 600 Characters"],
    minlength: [10, "projectHighLights long Should be 10 Characters"],
    trim: true,
    required: [true, "projectHighLights Is Required"],
  },
  projectNotes: {
    type: String,
    trim: true,
    required: false,
  },
});

const professionalProjectTeamsAndTools = new Schema({
  professionalProjectRole: {
    type: String,
    trim: true,
    required: [true, "Your Role Is Required"],
  },
  projectTeamMember: {
    type: String,
    trim: true,
    default: "",
  },
  projectToolsAndSoftware: {
    type: [String],
    trim: true,
  },
});

const professionalTagsAndControl = new Schema({
  projectServiceType: {
    type: [String],
    trim: true,
    required: [true, "Your Role Is Required"],
  },
  projectBuldingType: {
    type: String,
    trim: true,
    default: "",
  },
  lct: {
    type: [String],
    trim: true,
  },
});

const professionalProjectSchema = new Schema(
  {
    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    projectBasicDetail: professionalProjectBasicDetail,
    projectNarritveAndDesc: professionalProjectnarativeDetails,
    projectTt: professionalProjectTeamsAndTools,
    tagsAndControl: professionalTagsAndControl,
    projectImage: {
      type: [String],
      required: true,
      trim: true,
    },
    projectExecutionImg: {
      type: [String],
      required: false,
      trim: true,
    },
    presentaionBoardImg: {
      type: [String],
      required: false,
      trim: true,
    },
    projectTechDocImg: {
      type: [String],
      required: false,
      trim: true,
    },
    isDraft: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPublished: {
      type: Boolean,
      required: false,
      default: false,
    },
    isPublishedRejection: {
      type: String,
      required: false,
      default: "",
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// professionalProjectSchema.pre("save", async function (next) {
//   if (
//     this.isModified("projectBasicDetail.projectTitle") ||
//     this.isModified("projectBasicDetail.projectCategory") ||
//     this.isModified("projectBasicDetail.projectCity") ||
//     !this.slug
//   ) {
//     const baseSlug = slugify(
//       `${this.projectBasicDetail.projectTitle}-${this.projectBasicDetail.projectCategory}-${this.projectBasicDetail.projectCity}`,
//       { lower: true, strict: true }
//     );

//     let slug = baseSlug;
//     let counter = 1;

//     // Check for duplicates
//     while (
//       await mongoose.models.projects.findOne({
//         slug,
//         _id: { $ne: this._id }, // exclude self
//       })
//     ) {
//       slug = `${baseSlug}-${counter}`;
//       counter++;
//     }

//     this.slug = slug;
//   }
//   next();
// });

professionalProjectSchema.pre("save", async function (next) {
  try {
    if (
      this.isModified("projectBasicDetail.projectTitle") ||
      this.isModified("projectBasicDetail.projectCategory") ||
      this.isModified("projectBasicDetail.projectCity") ||
      !this.projectBasicDetail.slug
    ) {
      const baseSlug = slugify(
        `${this.projectBasicDetail.projectTitle}-${this.projectBasicDetail.projectCategory}-${this.projectBasicDetail.projectCity}`,
        { lower: true, strict: true }
      );

      let slug = baseSlug;
      let counter = 1;

      while (
        await mongoose.models.projects.findOne({
          "projectBasicDetail.slug": slug,
          _id: { $ne: this._id },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      this.projectBasicDetail.slug = slug;
    }
    next();
  } catch (err) {
    next(err);
  }
});



export const createProjectModal = mongoose.model(
  "projects",
  professionalProjectSchema
);
