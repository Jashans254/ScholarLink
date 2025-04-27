import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLoanById } from "../services/loanService";

const LoanDetails = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const data = await getLoanById(id);
        setLoan(data.loan);
      } catch (error) {
        console.error("Failed to load loan", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-lg text-gray-500">Loading your future options...</div>;
  if (!loan) return <div className="text-center py-20 text-lg text-red-500">Loan details not found.</div>;

  return (
    <div className="max-w-5xl mx-auto pt-24 px-6 pb-20">
      <Link to="/loans" className="text-blue-600 underline mb-6 inline-block hover:text-blue-800 transition">
        ← Back to Loans
      </Link>

      <div className="bg-white shadow-2xl rounded-2xl p-10 space-y-8">
        <h1 className="text-4xl font-bold text-blue-700">{loan.name}</h1>
        <p className="text-lg text-gray-600">{loan.loanType}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-600">Loan Details 📜</h2>
            <p><strong>📈 Interest Rate:</strong> {loan.interestRate}%</p>
            <p><strong>💰 Loan Amount:</strong> ₹{loan.loanAmount.toLocaleString()}</p>
            <p><strong>🕒 Repayment Duration:</strong> {loan.repaymentDuration} years</p>
            <p><strong>📝 Application Process:</strong> {loan.applicationProcess}</p>
            <p><strong>🎯 Benefits:</strong> {loan.benefits}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-600">Eligibility Criteria ✅</h2>
            {loan.eligibilityCriteria.incomeLimit && (
              <p><strong>👨‍👩‍👧‍👦 Income Limit:</strong> ₹{loan.eligibilityCriteria.incomeLimit.toLocaleString()}</p>
            )}
            <div>
              <strong>📚 Categories:</strong>
              <ul className="list-disc list-inside ml-4">
                {loan.eligibilityCriteria.category.map((cat, index) => (
                  <li key={index}>{cat}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>🎓 Course Types:</strong>
              <ul className="list-disc list-inside ml-4">
                {loan.eligibilityCriteria.courseTypes.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
            <div>
              {loan.eligibilityCriteria.state  && loan.eligibilityCriteria.state.length > 0 ? (
  <>
    <strong>📍 States:</strong>
    <ul className="list-disc list-inside ml-4">
      {loan.eligibilityCriteria.state.map((state, index) => (
        <li key={index}>{state}</li>
      ))}
    </ul>
  </>
) : null}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
