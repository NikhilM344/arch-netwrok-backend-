import mongoose, { Schema } from "mongoose";

const SignUpSchema = new Schema({
  firstName: {
    type: String,
    maxlength: [20, "FirstName Only Contains 20 Characters"],
    minlength: [3, "FirstName long Should be 3 Characters"],
    trim: true,
    required: [true, "FirstName Is Required"],
  },
  lastName: {
    type: String,
    maxlength: [20, "LastName Only Contains 20 Characters"],
    minlength: [3, "LastName long Should be 3 Characters"],
    trim: true,
    required: [true, "LastName Is Required"],
  },
  address:{
   type:String,
   required:false,
   trim:true,
   default:""
  },
   phone:{
   type:String,
   required:false,
   trim:true,
   default:""
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email Is Required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password Is Required"],
  },
  role: {
    type: String,
    enum: ["user", "professional", "admin"],
    default: "user",
  },
},{timestamps:true});

export const userSignUpModle = mongoose.model("user", SignUpSchema);
