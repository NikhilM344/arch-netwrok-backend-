import mongoose from "mongoose";
const { Schema } = mongoose;

const clientRequestsSchema = new Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", 
    required: true,
  },
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendors", 
    required: true,
  },
  clientName: {
    type: String,
    maxlength: [20, "clientName Only Contains 20 Characters"],
    minlength: [3, "clientName Should be minimum 3 Characters"],
    trim: true,
    required: [true, "clientName Is Required"],
  },
  clientProjectType: {
    type: String,
    trim: true,
    required: [true, "Project Type Is Required"],
  },
  clientProjectCategory: {
    type: String,
    trim: true,
    required: [true, "Project Category Is Required"],
  },
  clientProjectServicesType: {
    type: [String],
    trim: true,
    required: [true, "Service Type Is Required"],
  },
  clientProjectBudgetRange: {
    type: String,
    trim: true,
    required: [true, "Budget Range Is Required"],
  },
  clientProjectTimeLine: {
    type: String,
    trim: true,
    required: [true, "Project TimeLine Is Required"],
  },
  clientProjectLocation: {
    type: String,
    trim: true,
    required: [true, "Project Location Is Required"],
  },
  clientProjectDetail: {
    type: String,
    trim: true,
    required: [true, "Project Description Is Required"],
  },
  clientProjectSpecificRequirements: {
    type: String,
    trim: true,
  },
  clientPhoneNumber: {
    type: String,
    maxlength: [10, "Phone Number can be only 10 digits"],
    minlength: [10, "Phone Number should be exactly 10 digits"],
    trim: true,
    required: [true, "client Phone Number Is Required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Client Email Is Required"],
    trim: true,
  },
},{timestamps:true});

export const clientRequestModal = mongoose.model("ClientRequest", clientRequestsSchema);

