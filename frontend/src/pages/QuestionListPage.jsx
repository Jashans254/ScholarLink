import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const QuestionListPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await axios.get("https://scholarlink-cfsu.onrender.com/api/qa/questions");
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Page Heading */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Q&A Forum</h1>
          <Link
            to="/ask"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-full transition"
          >
            Ask a Question
          </Link>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {questions.length > 0 ? (
            questions.map((q) => (
              <Link
                to={`/questions/${q._id}`}
                key={q._id}
                className="block bg-white p-6 rounded-xl shadow hover:shadow-md hover:bg-gray-50 transition"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{q.title}</h2>
                <p className="text-sm text-gray-500">Posted by {q.user.name}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-600 text-center">No questions posted yet. Be the first to ask!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionListPage;
