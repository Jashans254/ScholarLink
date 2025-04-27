// src/components/emi/LoanSelector.jsx
import React, { useEffect, useState } from 'react';
import { getAllLoans } from "../../services/loanService";

const LoanSelector = ({ onSelectLoan }) => {
  const [loans, setLoans] = useState([]);
  const [selectedLoanId, setSelectedLoanId] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const loanList = await getAllLoans();
        setLoans(loanList);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };
    fetchLoans();
  }, []);

  const handleChange = (e) => {
    const loanId = e.target.value;
    setSelectedLoanId(loanId);
    onSelectLoan(loanId); // send back selected loan ID to parent
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">Select a Loan Plan</label>
      <select
        value={selectedLoanId}
        onChange={handleChange}
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <option value="">-- Select Loan --</option>
        {loans.map((loan) => (
          <option key={loan._id} value={loan._id}>
            {loan.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LoanSelector;
