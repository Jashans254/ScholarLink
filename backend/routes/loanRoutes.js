import express from "express";
import { createLoan, getAllLoans, getLoanById, updateLoanById, deleteLoanById } from "../controllers/loanController.js";
import { protect, admin } from "../middleware/authMiddleware.js";// Middleware to check if the user is admin

const router = express.Router();

// Admin-only routes: Create, Update, Delete
router.post("/",  protect, admin, createLoan);
router.put("/:id",  protect, admin,updateLoanById);
router.delete("/:id",  protect, admin,deleteLoanById);

// Public routes: Get all loans and Get loan by ID
router.get("/", getAllLoans);
router.get("/:id", getLoanById);

export default router;
