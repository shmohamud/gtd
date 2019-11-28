let mongoose = require ('mongoose');
let Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    actions : [{ type: Schema.Types.ObjectId, ref: 'Action' }]

  },
  {
    timestamps: true
  })
  

  
  module.exports = mongoose.model('Project', projectSchema)


