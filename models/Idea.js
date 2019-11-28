const ideaSchema = Schema({
  text: String,
  processed: false
});

const Idea = mongoose.model("Idea", ideaSchema);
