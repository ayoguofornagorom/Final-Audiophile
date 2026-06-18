// Defines all authentication-related API endpoints
// "Routes" tells express which controller function to run when a specific URL is hit a specific HTTP method

import express from "express";
import {
  getProfile,
  login,
  register,
  updateAvatar,
  updateProfile,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();
// public routes - anyone can access these

// Post /api/auth/register    creates new account
router.post("/register", register);

//post /api/auth/login   sign in and receive a token
router.post("/login", login);

// protected routes -- must send a valid JWT token in the Authorization header
// GET  /api/auth/profile - view your own profile
router.get("/profile", protect, getProfile);

// PUT /api/auth/profile -- update name, phone address or password
router.put("/profile", protect, updateProfile);

// POST /api/auth/avatar -- upload a new profile picture
router.post("/avatar", protect, upload.single("avatar"), updateAvatar); // upload.single("avatar") means Multer will look around for a field named "avatar" in the form

export default router;
