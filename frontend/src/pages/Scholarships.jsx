import { useEffect, useState } from "react";
import { getAllScholarships } from "../services/scholarshipService";
import { Link } from "react-router-dom";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const data = await getAllScholarships();
        setScholarships(data);
      } catch (error) {
        console.error("Failed to load scholarships", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-center py-16 mb-12">Available Scholarships</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {scholarships.map((scholarship) => (
          <Link
            key={scholarship._id}
            to={`/scholarships/${scholarship._id}`}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                {scholarship.name}
              </h2>
              <p className="text-gray-500">{scholarship.provider}</p>

              <div className="bg-blue-50 rounded-lg p-3 mt-4">
                <p className="text-blue-700 font-semibold">
                  Benefits: {scholarship.benefits}
                </p>
              </div>

              <div className="text-sm text-gray-400 mt-2">
                Tap to view full details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Scholarships;
