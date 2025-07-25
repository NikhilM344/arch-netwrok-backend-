import mongoose from "mongoose";

const scheduledReviewMailSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  email: { type: String, required: true },
  clientName: { type: String, required: true },
  professional: { type: Object, required: true },
  professionalId: { type: mongoose.Schema.Types.ObjectId, required: true }, // for review link
  sendAt: { type: Date, required: true },
  sent: { type: Boolean, default: false }
});

export const ScheduledReviewMail = mongoose.model("ScheduledReviewMail", scheduledReviewMailSchema);