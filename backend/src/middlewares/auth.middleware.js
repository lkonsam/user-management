import jwt from "jsonwebtoken";
import { isTokenRevoked } from "../repositories/logoutToken.repository.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Format: Bearer TOKEN
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Check revoked tokens first
    const revoked = await isTokenRevoked(token);
    if (revoked) {
      return res.status(401).json({ message: "Token has been revoked (logged out)" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
