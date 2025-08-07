import Feedback from "../models/Feedback.js"

export async function submitFeedback(req, res) {
  try {
    const { name, category, rating, message } = req.body

    const newFeedback = new Feedback({ name, category, rating, message, isApproved: false })
    await newFeedback.save()

    res.status(201).json({ success: true, message: "Feedback submitted!" })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

export async function getTopFeedbacks(req, res) {
  try {
    const feedbacks = await Feedback.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(3)

    res.status(200).json(feedbacks)
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}
export async function toggleFeedbackApproval(req, res) {
  try {
    const { isApproved } = req.body
    const { id } = req.params

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    )

    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" })
    }

    res.status(200).json({ success: true, data: feedback })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

export async function getAllFeedbacks(req, res) {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 })
    res.status(200).json(feedbacks)
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}