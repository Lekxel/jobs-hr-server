const success = (
  data: Object | null,
  message?: string | null,
  error?: Object
) => ({
  status: "Success",
  message: message || null,
  error: error || null,
  ...data,
});
export default success;
