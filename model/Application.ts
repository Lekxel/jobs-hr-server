import mongoose, { Document } from "mongoose";

export interface AppplicationDoc extends Document {
  AppplicationID: string;
  race: string;
  nationality: string;
  email: string;
  name: string;
  phone: string;
  info: string;
}

const AppplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    race: {
      type: String,
    },
    nationality: {
      type: String,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    info: {
      type: String,
    },
  },
  { versionKey: false }
);

const Appplication = mongoose.model<AppplicationDoc>(
  "Appplication",
  AppplicationSchema
);

export default Appplication;
