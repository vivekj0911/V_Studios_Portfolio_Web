// backend/controllers/mediaController.js
import cloudinary from "../Config/cloudinary.js";
import Media from "../models/Media.js";
import fs from "fs";

export const uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    const { title, category, description } = req.body;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      folder: "portfolio",
    });

    const media = new Media({
      title,
      url: result.secure_url,
      type: result.resource_type,
      category,
      description,
      public_id: result.public_id // ✅ Save this!
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
        description: media.description,
        uploadedAt: media.uploadedAt,
        views: media.views,
      },
    });
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

export const getAllMedia = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== "All" ? { category } : {};
    const mediaItems = await Media.find(query).sort({ uploadedAt: -1 });
    res.status(200).json(mediaItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch media", error: err.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    // ✅ Delete from Cloudinary first
    await cloudinary.uploader.destroy(media.public_id, {
      resource_type: media.type === "video" ? "video" : "image"
    });

    // ✅ Then delete from MongoDB
    await Media.findByIdAndDelete(id);

    res.status(200).json({ message: "Media deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete media", error: err.message });
  }
};

export const incrementViews = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    media.views += 1;
    await media.save();
    res.status(200).json({ message: "View incremented" });
  } catch (err) {
    res.status(500).json({ message: "Failed to increment view", error: err.message });
  }
};

export const getMediaStats = async (req, res) => {
  try {
    const totalPhotos = await Media.countDocuments({ type: "image" });
    const totalCategories = await Media.distinct("category");
    const recentUploads = await Media.countDocuments({
      uploadedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // past 7 days
    });
    const monthlyViews = await Media.aggregate([
      {
        $match: {
          uploadedAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          views: { $sum: "$views" }, // assuming each media has a `views` field
        },
      },
    ]);

    res.json({
      totalPhotos,
      totalCategories: totalCategories.length,
      recentUploads,
      monthlyViews: monthlyViews[0]?.views || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};
