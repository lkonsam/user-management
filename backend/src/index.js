import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/v1/index.js";

import { notFoundHandler } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Backend is running successfully 🚀" });
});

app.use("/api/v1", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});