import UserType from "../../types/User";

const validateScope = async (user: UserType, client: Object, scope: string) => {
  try {
    // if (scope === "password") {
    let us = await ["password"];
    return us;
    // }
    // return null;
  } catch (error) {
    return null;
  }
};

export default validateScope;
