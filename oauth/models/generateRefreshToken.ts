import jwt from "jsonwebtoken";
import User from "../../types/User";

const privateKey = "jobs-hrOauth_2";
const generateRefreshToken = async (
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
      refresh: true,
    },
    privateKey
  );
};

export default generateRefreshToken;
