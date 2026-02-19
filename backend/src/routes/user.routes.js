import express from "express";

import {
  getAllUsers,
  createUser,
  updateUser,
  updateUserStatus,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";


import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validateRequest } from "../middlewares/validation.middleware.js";

import {
  createUserValidator,
  updateUserValidator,
  updateUserStatusValidator,
} from "../validators/user.validator.js";



const router = express.Router();

// ADMIN ROUTES
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// ✅ Registration API (Admin creates user)
router.post(
  "/users",
  authMiddleware,
  adminMiddleware,
  createUserValidator,
  validateRequest,
  createUser
);

router.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidator,
  validateRequest,
  updateUser
);

router.patch(
  "/users/:id/status",
  authMiddleware,
  adminMiddleware,
  updateUserStatusValidator,
  validateRequest,
  updateUserStatus
);


// USER ROUTES
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

export default router;
