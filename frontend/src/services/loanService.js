import axios from "axios";

const API_URL = "https://scholarlink-cfsu.onrender.com/api/loans";

// Get all loans
export const getAllLoans = async () => {
  const response = await axios.get(API_URL);
  return response.data.loans;
};

// Get loan by ID
export const getLoanById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
//   return response.data.loan;
  return response.data;
  console.log(response.data.loan);
};
