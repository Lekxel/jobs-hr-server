import UserType from "../../types/User";
import {
  createToken,
  getTokenByUserID,
  updateToken,
} from "../../controllers/auth/getToken";

const saveToken = async (
  token: { accessToken: string },
  client: Object,
  user: UserType
) => {
  try {
    const newToken: any = {
      ...token,
      client,
      user,
    };

    let existingToken = await getTokenByUserID(user._id);

    // @ts-ignore
    delete newToken.scope;

    if (!existingToken) {
      let saveToken = { ...token };
      // @ts-ignore
      delete saveToken.scope;

      await createToken({ ...saveToken, userID: user._id });
    } else {
      await updateToken(user._id, newToken);
    }

    return newToken;
  } catch (error) {
    return null;
  }
};

export default saveToken;
