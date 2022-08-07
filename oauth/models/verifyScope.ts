const verifyScope = async (token: any, scope: string) => {
  if (scope === "password") {
    return await true;
  }
  return false;
};

export default verifyScope;
