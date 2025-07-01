import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  clientId:{
   type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user"
  },
  professionalId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Vendor"
  },
  rating:{
    type:Number,
    required:true,
    min:1,
    max:5,
  },
  comment:{
    type:String,
    required:false,
    maxlength:[400,"comment allowed only 400 characters"],
    minlength:[10,"atleast comment should be 10 characters or long 10 characters"]
  }
},{timestamps:true});

// Prevent duplicate reviews from same user
reviewSchema.index({ user: 1, professional: 1 }, { unique: true });

export const reviewModel = mongoose.model('reviews',reviewSchema);