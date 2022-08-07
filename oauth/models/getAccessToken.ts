import { getUserByID } from "../../controllers/auth/getUser";
import { getTokenByAccessToken } from "../../controllers/auth/getToken";

const getAccessToken = async (accessToken: string) => {
  try {
    let token = await getTokenByAccessToken(accessToken);

    if (token) {
      let user = await getUserByID(token.userID);
      return {
        ...token,
        accessTokenExpiresAt: new Date(token?.accessTokenExpiresAt),
        user: {
          email: user?.email,
          _id: user?._id,
        },
        client: {},
      };
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default getAccessToken;
