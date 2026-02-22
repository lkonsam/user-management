import jwt from "jsonwebtoken";
import { addRevokedToken, purgeExpiredTokens } from "../repositories/logoutToken.repository.js";
import { loginService } from "../services/auth.service.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    // decode without verifying in order to read exp (we will still trust we were called under authMiddleware)
    const decoded = jwt.decode(token, { complete: false });

    if (!decoded || !decoded.exp) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const expiresAt = new Date(decoded.exp * 1000);

    await addRevokedToken(token, expiresAt);

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const purgeRevokedTokens = async (req, res, next) => {
  try {
    await purgeExpiredTokens();
    res.json({ message: "Expired revoked tokens purged" });
  } catch (error) {
    next(error);
  }
};

export default { loginUser, logoutUser, purgeRevokedTokens };