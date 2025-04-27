import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AskQuestionPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "https://scholarlink-cfsu.onrender.com/api/qa/questions",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      toast.success("Question posted successfully!");
      navigate("/questions");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error posting question");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 pt-24 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Ask a New Question</h1>

        {/* Question Form */}
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="title">
              Question Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter a clear and concise title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="description">
              Question Description
            </label>
            <textarea
              id="description"
              placeholder="Provide a detailed description of your question"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-full transition"
          >
            Post Your Question
          </button>
        </form>
      </div>
    </section>
  );
};

export default AskQuestionPage;
