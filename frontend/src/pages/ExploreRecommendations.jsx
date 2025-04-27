// src/pages/ExploreRecommendations.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ExploreRecommendations() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check if user profile is complete
  const isProfileComplete = (user) => {
    if (!user) return false; 
    return (
      user.gender &&
      user.category &&
      user.income &&
      user.state &&
      user.academicDetails?.degree &&
      user.academicDetails?.year &&
      user.academicDetails?.percentage &&
      user.boardMarks?.tenth &&
      user.boardMarks?.twelfth &&
      user.courseType &&
      user.institutionName &&
      user.parentOccupation
    );
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data } = await axios.get("https://scholarlink-cfsu.onrender.com/api/recommendations", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        console.log("Recommendations data:", data); // Debugging line
        setRecommendations(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch recommendations.");
      } finally {
        setLoading(false);
      }
    };

    // Check if profile is complete
    // if (!isProfileComplete(user)) {
    //   // toast.info("Please complete your profile first!");
    //   navigate("/user");
    // } else {
      
    // }
    fetchRecommendations();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-blue-700">Loading recommendations...</p>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-600">No recommendations available.</p>
      </div>
    );
  }

  return (
    <section className="mt-16 min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Your Top Matches</h1>

        {/* Scholarships */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Scholarships for You</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.scholarships.map((scholarship) => (
              <div
                key={scholarship._id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">{scholarship.name}</h3>
                  <p className="text-sm mb-4">{scholarship.provider}</p>
                  <p className="text-gray-600 text-sm mb-2">
                    Eligibility: {scholarship.eligibility}
                  </p>
                  <p className="text-gray-600 text-sm">Benefits: {scholarship.benefits}</p>
                </div>
                <Link
                  to={`/scholarships/${scholarship._id}`}
                  className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Loans */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Education Loans for You</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.loans.map((loan) => (
              <div
                key={loan._id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">{loan.name}</h3>
                  <p className="text-sm mb-4">{loan.loanType}</p>
                  <p className="text-gray-600 text-sm mb-2">
                    Interest Rate: {loan.interestRate}%
                  </p>
                  <p className="text-gray-600 text-sm">Max Loan: ₹{loan.loanAmount}</p>
                </div>
                <Link
                  to={`/loans/${loan._id}`}
                  className="mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
