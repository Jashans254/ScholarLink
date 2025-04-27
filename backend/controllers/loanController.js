import Loan from "../models/Loan.js";

// 1. Create a new loan
export const createLoan = async (req, res) => {
  try {
    const { name, loanType, interestRate, loanAmount, repaymentDuration, eligibilityCriteria, applicationProcess, benefits } = req.body;
    
    const newLoan = new Loan({
      name,
      loanType,
      interestRate,
      loanAmount,
      repaymentDuration,
      eligibilityCriteria,
      applicationProcess,
      benefits,
    });

    await newLoan.save();
    res.status(201).json({ message: "Loan created successfully!", loan: newLoan });
  } catch (err) {
    res.status(500).json({ error: "Error creating loan", details: err.message });
  }
};

// 2. Get all loans
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json({ loans });
  } catch (err) {
    res.status(500).json({ error: "Error fetching loans", details: err.message });
  }
};

// 3. Get a loan by ID
export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    res.status(200).json({ loan });
  } catch (err) {
    res.status(500).json({ error: "Error fetching loan", details: err.message });
  }
};

// 4. Update loan by ID
export const updateLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    res.status(200).json({ message: "Loan updated successfully!", loan });
  } catch (err) {
    res.status(500).json({ error: "Error updating loan", details: err.message });
  }
};

// 5. Delete loan by ID
export const deleteLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    res.status(200).json({ message: "Loan deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting loan", details: err.message });
  }
};
