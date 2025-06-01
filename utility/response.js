const sendResponse = (
  res,
  statusCode,
  success,
  data = null,
  errors = null,
  message = ""
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    errors,
  });
};

export default sendResponse;
