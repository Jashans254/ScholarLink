import { useEffect, useState } from "react";
import { getAllLoans } from "../services/loanService";
import { Link } from "react-router-dom";

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getAllLoans();
        setLoans(data);
      } catch (error) {
        console.error("Failed to load loans", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 mt-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          📚 Explore Top Education Loans
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Compare trusted banks, flexible repayments, and student-friendly rates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loans.map((loan) => (
            <Link
              key={loan._id}
              to={`/loans/${loan._id}`}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 group"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                  {loan.name}
                </h2>
                <p className="text-gray-500">{loan.provider}</p>

                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="text-blue-700 font-semibold">
                    💸 Interest Rate: {loan.interestRate}%
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-400">View full details →</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:translate-y-[-2px] transition">
                    Learn More
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loans;
