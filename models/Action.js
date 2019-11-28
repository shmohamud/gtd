let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const actionSchema = Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  text: { String },
  completed: { type: Boolean, required: true }
});

module.exports = mongoose.model("Action", actionSchema);
