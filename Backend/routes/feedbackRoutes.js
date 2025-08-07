import { Router } from "express"
import { submitFeedback, getTopFeedbacks, toggleFeedbackApproval, getAllFeedbacks } from "../controllers/feedbackController.js";
const router = Router()


// POST feedback
router.post("/", submitFeedback)
router.get("/", getAllFeedbacks)

// GET top 3 feedbacks
router.get("/top3", getTopFeedbacks)
router.put("/:id/approve", toggleFeedbackApproval)

export default router
