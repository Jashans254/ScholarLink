import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getScholarshipById } from "../services/scholarshipService";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const data = await getScholarshipById(id);
        setScholarship(data);
      } catch (error) {
        console.error("Failed to load scholarship", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!scholarship) return <div className="text-center mt-10">Scholarship not found</div>;

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <Link to="/scholarships" className="text-blue-600 hover:underline mb-6 py-10 inline-block">
        ← Back to Scholarships
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
        <div className="border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-800">{scholarship.name}</h1>
          <p className="text-lg text-gray-500 mt-2">{scholarship.provider}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-blue-600">Eligibility Criteria</h2>
              <p className="text-gray-700 mt-1">{scholarship.eligibility}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-600">Benefits</h2>
              <p className="text-gray-700 mt-1">{scholarship.benefits}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-600">Application Process</h2>
              <p className="text-gray-700 mt-1">{scholarship.applicationProcess}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-blue-600">Important Dates</h2>
              <p className="text-gray-700 mt-1">
                Deadline: <span className="font-semibold">{new Date(scholarship.deadlines).toLocaleDateString()}</span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-600">Renewal Criteria</h2>
              <p className="text-gray-700 mt-1">{scholarship.renewalCriteria}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-600">Required Documents</h2>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                {scholarship.requiredDocuments.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
