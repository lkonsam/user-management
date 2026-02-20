import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../repositories/user.repository.js";


export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }

  if (user.status !== "ACTIVE") {
    throw { statusCode: 403, message: "User account is inactive" };
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};