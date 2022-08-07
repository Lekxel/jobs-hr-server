const error = (
  data: Object | null,
  message?: string | null,
  error?: Object
) => ({
  status: "Error",
  message: message || null,
  error: error || null,
  ...data,
});
export default error;
