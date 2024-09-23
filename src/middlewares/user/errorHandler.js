function errorHandler(err, _, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  const details = err.details || null;

  console.error(`Error: ${message}`, err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
  });
}

export default errorHandler;
