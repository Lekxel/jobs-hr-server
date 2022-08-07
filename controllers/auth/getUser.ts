import bcrypt from "bcrypt";
import User from "../../model/User";

export const getUserByEmail = async (email: string) => {
  try {
    let user = await User.findOne(
      { email: email.toLowerCase() },
      { password: 0 }
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserByID = async (_id: string) => {
  try {
    let user = await User.findOne({ _id }, { password: 0 });

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    let user = await User.findOne({ email: email.toLowerCase() }, { __v: 0 });

    if (!user) {
      return null;
    }
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = async (_id: string, newUser: Object) => {
  try {
    let user = await User.findOneAndUpdate({ _id }, newUser, { new: true });

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
