import mongoose, { Schema } from "mongoose";

const StepScheme = new Schema(
  {
    text: String,
    description: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Step", StepScheme);
