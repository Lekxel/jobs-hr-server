import jwt from "jsonwebtoken";
import User from "../../types/User";

const privateKey = "jobs-hrOauth";
const generateAccessToken = async (
  client: Object,
  user: User,
  scope: string
) => {
  return jwt.sign(
    {
      email: user.email,
      scope,
      client,
      randToken: Math.random() * 1000000000000,
    },
    privateKey
  );
};

export default generateAccessToken;
