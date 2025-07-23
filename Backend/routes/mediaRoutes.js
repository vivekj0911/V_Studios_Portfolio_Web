// backend/routes/mediaRoutes.js
import express from "express";
import multer from "multer";
import { uploadMedia, getAllMedia } from "../controllers/mediaController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // saves to disk temporarily

router.post("/upload", verifyAdmin, upload.single("file"), uploadMedia);
router.get("/", getAllMedia);

export default router;
