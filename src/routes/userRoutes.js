import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getProfile, updateProfile } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/get-profile", authenticateToken, getProfile);
router.delete("/:id", authenticateToken, deleteAccount)
router.patch("/:id", authenticateToken, updateProfile)

export default router;
