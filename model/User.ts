import mongoose, { Document } from "mongoose";

export interface UserDoc extends Document {
  picture: string;
  name: string;
  regDate: Date;
  password: string;
  email: string;
  online: boolean;
  lastLogin: Date;
  status: "active" | "suspended";
  timezone: string;
  color: string;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    online: {
      type: Boolean,
      default: false,
    },
    picture: {
      type: String,
    },
    lastLogin: {
      type: Date,
    },
    regDate: {
      type: Date,
    },
    timezone: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { versionKey: false }
);

const User = mongoose.model<UserDoc>("User", UserSchema);

export default User;
