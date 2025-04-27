import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answerText: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
