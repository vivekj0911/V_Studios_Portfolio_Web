// backend/models/Media.js
import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ["image", "video"], required: true },
  category: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Media", mediaSchema);
