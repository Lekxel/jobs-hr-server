import mongoose from "mongoose";

export const removeFalsyValues = (obj: any) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (!newObj[key]) {
      delete newObj[key];
    }
  });
  return newObj;
};

export const validMongoId = (id: string) => mongoose.Types.ObjectId.isValid(id);
