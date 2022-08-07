import mongoose, { Document } from "mongoose";

export interface JobDoc extends Document {
  title: string;
  company: string;
  deadline: Date;
  jobType: string;
  category: string;
  location: string;
  salary: number;
  description: string;
}

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    jobType: {
      type: String,
    },
    category: {
      type: String,
    },
    location: {
      type: String,
    },
    salary: {
      type: Number,
    },
    deadline: {
      type: Date,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false }
);

const Job = mongoose.model<JobDoc>("Job", JobSchema);

export default Job;
