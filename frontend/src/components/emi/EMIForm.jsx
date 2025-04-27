// src/components/emi/EMIForm.jsx
import React, { useState } from 'react';

const EMIForm = ({ loan, onEMICalculate }) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEmi] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loanAmount || !loanTenure) {
      alert("Please enter loan amount and tenure");
      return;
    }

    const emiCalculated = calculateEMI(loanAmount, loanTenure, loan.interestRate);
    setEmi(emiCalculated);
    onEMICalculate(emiCalculated); // Pass back the calculated EMI
  };

  const calculateEMI = (amount, tenure, interestRate) => {
    const principal = parseFloat(amount);
    const months = parseInt(tenure) * 12;
    const rate = interestRate / 100 / 12;

    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return emi.toFixed(2);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl mb-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">EMI Calculator</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="mb-4">
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter Loan Amount"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="loanTenure" className="block text-sm font-medium text-gray-700">
            Loan Tenure (years)
          </label>
          <input
            type="number"
            id="loanTenure"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter Loan Tenure in Years"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Calculate EMI
        </button>
      </form>

      {emi && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-lg font-semibold text-gray-800">Your Monthly EMI is:</p>
          <p className="text-2xl font-bold text-blue-600">₹{emi}</p>
        </div>
      )}
    </div>
  );
};

export default EMIForm;
