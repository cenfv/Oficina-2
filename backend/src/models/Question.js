const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Por favor, insira um titulo"],
  },
  description: {
    type: String,
    required: [true, "Por favor, insira uma descrição"],
  },
  editionYear: {
    type: Number,
    required: [true, "Por favor, insira um ano de edição"],
  },
  difficulty: {
    type: Number,
    required: [true, "Por favor, insira uma dificuldade"],
  },
  imageUrl: {
    type: String,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
});


module.exports = mongoose.model("Question", questionSchema);
