import express from "express";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import { protect } from "../middleware/authMiddleware.js"; // assuming you already have JWT-based middleware

const router = express.Router();

// POST - create a question
router.post("/questions", protect, async (req, res) => {
  try {
    const { title, description } = req.body;
    const question = await Question.create({
      user: req.user._id,
      title,
      description,
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - fetch all questions
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 }).populate("user", "name");
    res.json(questions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - fetch a question and its answers
router.get("/questions/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("user", "name");
    const answers = await Answer.find({ question: req.params.id }).populate("user", "name");
    res.json({ question, answers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST - add an answer
router.post("/answers", protect, async (req, res) => {
  try {
    const { questionId, answerText } = req.body;
    const answer = await Answer.create({
      question: questionId,
      user: req.user._id,
      answerText,
    });
    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
