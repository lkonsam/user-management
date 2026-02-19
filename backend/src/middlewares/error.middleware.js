export const errorHandler = (err, req, res, next) => {
  console.error("Global Error:", err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
};
