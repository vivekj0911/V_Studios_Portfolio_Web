// backend/controllers/mediaController.js
import cloudinary from "../Config/cloudinary.js";
import Media from "../models/Media.js";
import fs from "fs";

export const uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    const { title, category } = req.body;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto", // automatically detect image or video
      folder: "portfolio",
    });

    const media = new Media({
      title,
      url: result.secure_url,
      type: result.resource_type, // "image" or "video"
      category,
    });

    await media.save();

    // Clean up local file (Multer saves to /tmp or disk)
    fs.unlinkSync(file.path);

    res.status(201).json({ message: "Uploaded successfully", media });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};
