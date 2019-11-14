let mongoose = require ('mongoose');
let Schema = mongoose.Schema

const stepSchema = new Schema(
  {
    project: {type:Schema.Types.ObjectId, ref:'Project'} ,   
    text: String,
    completed: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Step', stepSchema);
