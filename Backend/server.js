import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
dotenv.config();


const app = express();
app.use(cors({
  origin: "*", // temporary for testing
  credentials: true
}));
app.use(express.json());

app.use("/api/media", mediaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => console.error(err));
