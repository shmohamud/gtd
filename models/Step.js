import mongoose, { Schema } from "mongoose";

const StepScheme = new Schema(
  {
    _id: Schema.Types.ObjectId,
    text: String,
    completed: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Step', StepScheme);
