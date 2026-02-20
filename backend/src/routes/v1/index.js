import express from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API V1 is running successfully 🚀" });
});
router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;