import mongoose, { Document, Schema } from "mongoose";

export interface TokenDoc extends Document {
  userID: string;
  accessToken: string;
  refreshToken: string;
  user: Object;
  accessTokenExpiresAt: string;
}

const TokenSchema: Schema = new mongoose.Schema(
  {
    userID: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    accessTokenExpiresAt: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    refreshTokenExpiresAt: {
      type: Date,
    },
    scope: {
      type: Array,
    },
    user: {
      type: Object,
    },
    client: {
      type: Object,
    },
  },
  { versionKey: false }
);

const Token = mongoose.model<TokenDoc>("Token", TokenSchema);
export default Token;
