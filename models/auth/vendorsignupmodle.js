import mongoose, { Schema } from "mongoose";

const portfolioSchema = new Schema({
  projectTitle: {
    type: String,
    required: [true, "Project Title Is Required"],
    trim: true,
  },
  buildingType: {
    type: String,
    required: [true, "Building Type Is Required"],
    trim: true,
  },
  buildingLocation: {
    type: String,
    required: [true, "Building Location Is Required"],
    trim: true,
  },
  completionYear: {
    type: Number,
    required: [true, "Completion Year Is Required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description Is Required"],
    trim: true,
  },
  thumbnailImage: {
    type: String, 
    required: [true, "Thumbnail Image URL is required"],
    trim: true,
  },
  portfolioThumbnailImage: {
    type: String, 
    required: [true, "Thumbnail Image URL is required"],
    trim: true,
  },
});

const vendorSignUpSchema = new Schema({
  companyName: {
    type: String,
    maxlength: [40, "Company Name max 40 chars"],
    minlength: [5, "Min 5 chars required"],
    required: true,
    trim: true,
  },
  registrationPlace: {
    type: String,
    maxlength: [20, "Max 20 chars"],
    minlength: [3, "Min 3 chars"],
    required: true,
    trim: true,
  },
  ArchitectName: {
    type: String,
    maxlength: [30],
    minlength: [3],
    required: true,
    trim: true,
  },
  coaNumber: {
    type: String,
    required: true,
    trim: true,
  },
  licenseImage: {
    type: String, // Public path to license image
    required: [true, "License Image is required"],
    trim: true,
  },
  fullName: {
    type: String,
    maxlength: [30],
    minlength: [3],
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: Number,
    required: true,
    trim: true,
  },
  portfolio: portfolioSchema,
  agreeTerms: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const vendorSignUpModel = mongoose.model("Vendor", vendorSignUpSchema);
