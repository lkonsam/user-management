import express from "express";

import {
  getAllUsers,
  createUser,
  updateUserStatus,
  getProfile,
  updateProfile,
} from "../../controllers/user.controller.js";


import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { adminMiddleware } from "../../middlewares/admin.middleware.js";

import {
  createUserValidator,
  updateUserValidator,
  updateUserStatusValidator,
} from "../../validators/user.validator.js";



const userRouter = express.Router();

// ADMIN ROUTES
userRouter.get("/", authMiddleware, adminMiddleware, getAllUsers);

// ✅ Registration API (Admin creates user)
userRouter.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createUserValidator,
  createUser
);



// USER ROUTES
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile", authMiddleware, updateProfile);


userRouter.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidator,
  updateProfile
);


userRouter.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateUserStatusValidator,
  updateUserStatus
);


export default userRouter;
