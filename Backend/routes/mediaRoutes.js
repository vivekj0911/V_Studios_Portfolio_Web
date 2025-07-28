// backend/routes/mediaRoutes.js
import express from "express";
import multer from "multer";
import {
    uploadMedia,
    getAllMedia,
    deleteMedia,
    incrementViews,
    getMediaStats,
} from "../controllers/mediaController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // saves to disk temporarily

router.post("/upload", verifyAdmin, upload.single("file"), uploadMedia);
router.get("/", getAllMedia);
router.delete("/:id", verifyAdmin, deleteMedia);
router.post("/:id/view", incrementViews);
router.get("/stats", verifyAdmin, getMediaStats);


export default router;
