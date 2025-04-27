import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  loanType: { type: String, required: true }, // E.g., Educational Loan, Government Loan, etc.
  interestRate: { type: Number, required: true }, // Interest rate in percentage
  loanAmount: { type: Number, required: true }, // Maximum loan amount
  repaymentDuration: { type: Number, required: true }, // Repayment duration in years
  eligibilityCriteria: {
    incomeLimit: { type: Number }, // Maximum income limit for eligibility
    category: { type: [String] }, // e.g., SC, ST, OBC, General
    courseTypes: { type: [String] }, // e.g., Engineering, Medical, etc.
    state: { type: [String] }, // e.g., State-based loan schemes
  },
  applicationProcess: { type: String }, // Short description of the application process
  benefits: { type: String }, // Benefits of the loan
}, { timestamps: true });

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
