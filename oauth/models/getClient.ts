const getClient = async (clientId: string, clientSecret: string) => {
  if (clientId === "jobs-hr") {
    const client = await { id: "jobs-hr", grants: ["password"] };
    return client;
  }
  return null;
};

export default getClient;
