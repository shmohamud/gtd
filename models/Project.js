let mongoose = require ('mongoose');
let Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: String,
    description: String,
    steps: [{type: Schema.Types.ObjectId, ref: 'Step'}]
  },
  {
    timestamps: true
  })

  module.exports = mongoose.model('Project', projectSchema)


