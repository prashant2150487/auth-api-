import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  allUsers,
  getProfile,
  getUserById,
  updateProfile,
} from "../controllers/userControllers.js";

const router = express.Router();
// Get logged-in user profile
router.get("/me", authenticateToken, getProfile);
// router.delete("/:id", authenticateToken, deleteAccount)
router.put("/me", authenticateToken, updateProfile);
router.get("/", authenticateToken, allUsers);
router.get("/:id",getUserById)

export default router;
