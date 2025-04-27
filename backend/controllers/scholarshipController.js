import asyncHandler from "express-async-handler";
import Scholarship from "../models/Scholarship.js";

// @desc    Create a new scholarship
// @route   POST /api/scholarships
// @access  Private (Admin)
export const createScholarship = asyncHandler(async (req, res) => {
  const { name, provider, eligibility, benefits, requiredDocuments, applicationProcess, deadlines, renewalCriteria } = req.body;

  const scholarship = new Scholarship({
    name,
    provider,
    eligibility,
    benefits,
    requiredDocuments,
    applicationProcess,
    deadlines,
    renewalCriteria,
  });

  const createdScholarship = await scholarship.save();
  res.status(201).json(createdScholarship);
});

// @desc    Get all scholarships
// @route   GET /api/scholarships
// @access  Public
export const getScholarships = asyncHandler(async (req, res) => {
  const scholarships = await Scholarship.find({});
  res.json(scholarships);
});

// @desc    Get scholarship by ID
// @route   GET /api/scholarships/:id
// @access  Public
export const getScholarshipById = asyncHandler(async (req, res) => {
  const scholarship = await Scholarship.findById(req.params.id);

  if (scholarship) {
    res.json(scholarship);
  } else {
    res.status(404);
    throw new Error("Scholarship not found");
  }
});

// @desc    Update a scholarship
// @route   PUT /api/scholarships/:id
// @access  Private (Admin)
export const updateScholarship = asyncHandler(async (req, res) => {
  const { name, provider, eligibility, benefits, requiredDocuments, applicationProcess, deadlines, renewalCriteria } = req.body;

  const scholarship = await Scholarship.findById(req.params.id);

  if (scholarship) {
    scholarship.name = name || scholarship.name;
    scholarship.provider = provider || scholarship.provider;
    scholarship.eligibility = eligibility || scholarship.eligibility;
    scholarship.benefits = benefits || scholarship.benefits;
    scholarship.requiredDocuments = requiredDocuments || scholarship.requiredDocuments;
    scholarship.applicationProcess = applicationProcess || scholarship.applicationProcess;
    scholarship.deadlines = deadlines || scholarship.deadlines;
    scholarship.renewalCriteria = renewalCriteria || scholarship.renewalCriteria;

    const updatedScholarship = await scholarship.save();
    res.json(updatedScholarship);
  } else {
    res.status(404);
    throw new Error("Scholarship not found");
  }
});

// @desc    Delete a scholarship
// @route   DELETE /api/scholarships/:id
// @access  Private (Admin)
export const deleteScholarship = asyncHandler(async (req, res) => {
  const scholarship = await Scholarship.findById(req.params.id);

  if (scholarship) {
    await Scholarship.findByIdAndDelete(req.params.id); 
    res.json({ message: "Scholarship removed" });
  } else {
    res.status(404);
    throw new Error("Scholarship not found");
  }
});
