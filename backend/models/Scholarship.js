import mongoose from "mongoose";

const scholarshipSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String, // could also be a nested object depending on your requirements
      required: true,
    },
    benefits: {
      type: String,
      required: true,
    },
    requiredDocuments: {
      type: [String], // Array of document names
      required: true,
    },
    applicationProcess: {
      type: String,
      required: true,
    },
    deadlines: {
      type: Date,
      required: true,
    },
    renewalCriteria: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

export default Scholarship;
