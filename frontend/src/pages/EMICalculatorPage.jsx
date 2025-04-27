import React, { useState } from 'react';
import LoanSelector from '../components/emi/LoanSelector';
import LoanDetailsCard from '../components/emi/LoanDetailsCard';
import EMIForm from '../components/emi/EMIForm';
import { getLoanById } from "../services/loanService";

const EMICalculatorPage = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [emi, setEmi] = useState(null);

  const handleLoanSelect = async (loanId) => {
    try {
      const loanData = await getLoanById(loanId);
      setSelectedLoan(loanData.loan);
    } catch (error) {
      console.error('Error fetching loan by ID:', error);
    }
  };

  const handleEMICalculate = (calculatedEmi) => {
    setEmi(calculatedEmi);
  };

  return (
    <section className="min-h-screen bg-gray-100 pt-24 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg space-y-8">
        
        {/* Loan Selector */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Select Your Loan</h2>
          <LoanSelector onSelectLoan={handleLoanSelect} />
        </div>

        {/* Loan Details */}
        {selectedLoan && (
          <div>
            <LoanDetailsCard loan={selectedLoan} />
          </div>
        )}

        {/* EMI Form */}
        {selectedLoan && (
          <div>
            <EMIForm loan={selectedLoan} onEMICalculate={handleEMICalculate} />
          </div>
        )}

        {/* Final EMI Calculation */}
        {emi && (
          <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800">Your EMI Calculation</h3>
            <p className="text-xl text-blue-600">₹{emi}</p>
            <p className="text-sm text-gray-600">This is your monthly installment based on the selected loan parameters.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default EMICalculatorPage;
