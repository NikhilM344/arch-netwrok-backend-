import mongoose from "mongoose";

const adminLoginSchema = new mongoose.Schema({
   username:{
        type: String,
        required: true,
        unique: true,
        trim:true,
   },
   password:{
        type: String,
        required: true,
        trim:true,
   }
})

export const adminLoginModel = mongoose.model("adminlogin",adminLoginSchema);