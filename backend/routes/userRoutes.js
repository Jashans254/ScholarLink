import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
  promoteUserToAdmin,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect , admin} from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
// Promote a user to admin (Admin only)
router.put("/:id/promote", protect, admin, promoteUserToAdmin);

router.put("/profile", protect, updateUserProfile);
export default router;
