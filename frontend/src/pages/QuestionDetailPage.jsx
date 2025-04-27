import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await axios.get(`https://scholarlink-cfsu.onrender.com/api/qa/questions/${id}`);
      setQuestion(data.question);
      setAnswers(data.answers);
    };
    fetchQuestion();
  }, [id]);

  const submitAnswer = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "/api/qa/answers",
        {
          questionId: id,
          answerText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      toast.success("Answer submitted!");
      setAnswerText("");
      const { data } = await axios.get(`/api/qa/questions/${id}`);
      setAnswers(data.answers);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting answer");
    }
  };

  if (!question) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-100 pt-24 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow space-y-8">
        
        {/* Question Title and Description */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{question.title}</h1>
          <p className="text-gray-700 text-lg">{question.description}</p>
        </div>

        {/* Answers Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Answers ({answers.length})</h2>
          <div className="space-y-4">
            {answers.length === 0 ? (
              <p className="text-gray-500 italic">No answers yet. Be the first to answer!</p>
            ) : (
              answers.map((a) => (
                <div key={a._id} className="border rounded-lg p-4 bg-gray-50">
                  <p className="text-gray-800 mb-2">{a.answerText}</p>
                  <p className="text-sm text-gray-500 text-right">— {a.user.name}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Answer Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Answer</h2>
          <form onSubmit={submitAnswer} className="space-y-4">
            <textarea
              placeholder="Write your answer here..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-full transition"
            >
              Submit Answer
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default QuestionDetailPage;
