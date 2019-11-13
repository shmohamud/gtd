import mongoose, { Schema } from "mongoose";

const ProjectScheme = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    description: String,
    steps: [{type: Schema.Types.ObjectId, ref: 'Step'}]
  },
  {
    timestamps: true
  })

  module.exports = mongoose.model('Project', ProjectScheme)


