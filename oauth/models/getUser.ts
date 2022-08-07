import { getUserByEmailAndPassword } from "../../controllers/auth/getUser";

const getUser = async (email: string, password: string) => {
  try {
    let user = await getUserByEmailAndPassword(email, password);
    if (!user) return null;

    return { email: user?.email, _id: user?._id };
  } catch (error) {
    return null;
  }
};

export default getUser;
