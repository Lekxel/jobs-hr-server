const getToken = (authorization: string | undefined) => {
  if (!authorization) return null;
  let token = authorization.split("Bearer ");
  return token[1] ? token[1] : null;
};

export default getToken;
