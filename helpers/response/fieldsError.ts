const fieldsError = (errors: any) => {
  let errorFields: any = {};
  errors.map((error: any) => (errorFields[error.param] = error.msg));
  return errorFields;
};

export default fieldsError;
