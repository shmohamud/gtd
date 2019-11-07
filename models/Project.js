import mongoose, { Schema } from "mongoose";
import stepScheme from "./Step";

const ProjectScheme = new Schema(
  {
    title: String,
    description: String,
    steps: [stepScheme]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", ProjectScheme);
