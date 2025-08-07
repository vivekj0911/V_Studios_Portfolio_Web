import { Schema, model } from "mongoose"

const FeedbackSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default model("Feedback", FeedbackSchema)
