import React from 'react';

const LoanDetailsCard = ({ loan }) => {
  if (!loan) return null;

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg mb-4">
      <h2 className="text-2xl font-semibold text-blue-600">Loan Details 📜</h2>
      <p><strong>📈 Interest Rate:</strong> {loan.interestRate}%</p>
      <p><strong>💰 Loan Amount:</strong> ₹{loan.loanAmount.toLocaleString()}</p>
      <p><strong>🕒 Repayment Duration:</strong> {loan.repaymentDuration} years</p>
      <p><strong>📝 Application Process:</strong> {loan.applicationProcess}</p>
      <p><strong>🎯 Benefits:</strong> {loan.benefits}</p>
    </div>
  );
};

export default LoanDetailsCard;
