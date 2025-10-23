import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { requestPasswordReset, signIn, signUp } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/signup', signUp);
router.post("/signin", signIn);
router.post("/request-password-reset", requestPasswordReset);


// Protected routes

export default router;
