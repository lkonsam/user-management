import express from "express";
import { loginUser, logoutUser, purgeRevokedTokens } from "../../controllers/auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { adminMiddleware } from "../../middlewares/admin.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout", authMiddleware, logoutUser);

// Admin-only endpoint to purge expired revoked tokens
authRouter.post("/purge-revoked", authMiddleware, adminMiddleware, purgeRevokedTokens);

export default authRouter;
