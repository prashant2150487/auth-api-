import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  requestPasswordReset,
  resendEmailVerificationOtp,
  signIn,
  signUp,
  verifyEmailOtp,
} from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/request-password-reset", requestPasswordReset);
router.post("/verifyEmailOtp", verifyEmailOtp);
router.post("/resendEmailVerificationOtp", resendEmailVerificationOtp);

// Protected routes

export default router;
