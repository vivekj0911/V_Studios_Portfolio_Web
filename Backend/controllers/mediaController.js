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

    res.status(201).json({
      message: "Uploaded successfully",
      media: {
        id: media._id,
        title: media.title,
        url: media.url,
        type: media.type,
        category: media.category,
      },
    });
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

export const getAllMedia = async (req, res) => {
  try {
    const mediaItems = await Media.find().sort({ uploadedAt: -1 });
    res.status(200).json(mediaItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch media", error: err.message });
  }
};
