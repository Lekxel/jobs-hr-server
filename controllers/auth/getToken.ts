import Token from "../../model/Token";

export const getTokenByAccessToken = async (accessToken: string) => {
  try {
    let token = await Token.findOne({ accessToken });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTokenByUserID = async (_id: string) => {
  try {
    let token = await Token.findOne({ userID: _id });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateToken = async (_id: string, newToken: Object) => {
  try {
    await Token.findOneAndUpdate({ userID: _id }, newToken);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createToken = async (newToken: Object) => {
  try {
    await Token.create({ ...newToken });
  } catch (error) {
    console.log({ error });
    return false;
  }
};
