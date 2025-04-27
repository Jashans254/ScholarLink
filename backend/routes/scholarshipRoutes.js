import express from "express";
const router = express.Router();
import {
  createScholarship,
  getScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
} from "../controllers/scholarshipController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Create a scholarship (Admin only)
router.post("/", protect, admin, createScholarship);

// Get all scholarships (Public)
router.get("/", getScholarships);

// Get a scholarship by ID (Public)
router.get("/:id", getScholarshipById);

// Update a scholarship (Admin only)
router.put("/:id", protect, admin, updateScholarship);

// Delete a scholarship (Admin only)
router.delete("/:id", protect, admin, deleteScholarship);

export default router;
