import axios from "axios";

const API_URL = "https://scholarlink-cfsu.onrender.com/api/scholarships";

export const getAllScholarships = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const getScholarshipById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};
