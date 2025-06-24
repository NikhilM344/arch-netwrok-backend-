import mongoose, { Schema } from "mongoose";

const professionalPortFolioSchema = new Schema({
  professionalId:{
    type:mongoose.Schema.Types.ObjectId,
    refs:"Vendor",
    required:true
  },
  portfolioTitle: {
    type: String,
    maxlength: [30, "Portfolio ProjectTitle Only Contains 30 Characters"],
    minlength: [3, "Portfolio ProjectTitle long Should be 3 Characters"],
    trim: true,
    required: [true, "ProjectTitle Is Required"],
  },
  buildingType: {
    type: String,
    maxlength: [30, "buldingType Only Contains 30 Characters"],
    minlength: [3, "buldingType long Should be 3 Characters"],
    trim: true,
    required: [true, "buldingType Is Required"],
  },
  portfolioLocation: {
    type: String,
    required: [true, "projectLocation Is Required"],
    trim: true,
  },
  portfolioDescription: {
    type: String,
    required: [true, "Project Description Is Required"],
    trim: true,
  },
  portfolioImage: {
    type: String,
    required:true
  },
  projectCompletionYear:{
  type:Number,
  required:true,
  },
  isFeatured:{
    required:false,
    type:Boolean,
    default:false
  }
},{timestamps:true});

export const createPortfolioModal = mongoose.model("portfolios", professionalPortFolioSchema);
