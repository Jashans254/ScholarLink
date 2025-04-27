import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const { user, isAuth } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    gender: user?.gender || "",
    category: user?.category || "",
    income: user?.income || "",
    state: user?.state || "",
    academicDetails: {
      degree: user?.academicDetails?.degree || "",
      year: user?.academicDetails?.year || "",
      percentage: user?.academicDetails?.percentage || "",
    },
    boardMarks: {
      tenth: user?.boardMarks?.tenth || "",
      twelfth: user?.boardMarks?.twelfth || "",
    },
    courseType: user?.courseType || "",
    institutionName: user?.institutionName || "",
    parentOccupation: user?.parentOccupation || "",
    specialAchievements: user?.specialAchievements?.join(", ") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("academicDetails.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        academicDetails: { ...prev.academicDetails, [field]: value },
      }));
    } else if (name.startsWith("boardMarks.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        boardMarks: { ...prev.boardMarks, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        specialAchievements: formData.specialAchievements.split(",").map((item) => item.trim()),
      };
      await axios.put('/api/users/profile', payload, {
  headers: {
    Authorization: `Bearer ${user.token}`
  }
});
      alert("Profile updated successfully!");
      navigate("/explore");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isAuth) {
    return <div className="text-white text-center mt-10">Please log in to access your profile.</div>;
  }

  return (
    <section className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white/90 p-8 m-10 rounded-xl shadow-xl">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-8">
          Welcome, {user?.name}! ✨
        </h1>
        <p className="text-lg text-center text-gray-600 mb-6">
          Fill in your details to match the best scholarships and loans crafted for your journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="Male/Female/Other"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="E.g., OBC, SC, ST, General"
                required
              />
            </div>

            {/* Income */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Family Income (₹)</label>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="Annual family income"
                required
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="Your home state"
                required
              />
            </div>

            {/* Course Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Course Type</label>
              <input
                type="text"
                name="courseType"
                value={formData.courseType}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="E.g., Engineering, Medical"
                required
              />
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Institution Name</label>
              <input
                type="text"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="E.g., IIT Kanpur"
                required
              />
            </div>

            {/* Parent Occupation */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Parent's Occupation</label>
              <input
                type="text"
                name="parentOccupation"
                value={formData.parentOccupation}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="E.g., Teacher, Farmer, Defense"
                required
              />
            </div>
          </div>

          {/* Academic Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                name="academicDetails.degree"
                value={formData.academicDetails.degree}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Passing Year</label>
              <input
                type="number"
                name="academicDetails.year"
                value={formData.academicDetails.year}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Percentage</label>
              <input
                type="number"
                name="academicDetails.percentage"
                value={formData.academicDetails.percentage}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                required
              />
            </div>
          </div>

          {/* Board Marks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">10th Marks (%)</label>
              <input
                type="number"
                name="boardMarks.tenth"
                value={formData.boardMarks.tenth}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">12th Marks (%)</label>
              <input
                type="number"
                name="boardMarks.twelfth"
                value={formData.boardMarks.twelfth}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
                required
              />
            </div>
          </div>

          {/* Special Achievements */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Special Achievements (comma-separated)</label>
            <textarea
              name="specialAchievements"
              value={formData.specialAchievements}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="e.g., NTSE Scholar, JEE Rank 4521"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-all"
          >
            Save & Continue 🚀
          </button>
        </form>
      </div>
    </section>
  );
}
