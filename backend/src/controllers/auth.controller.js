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