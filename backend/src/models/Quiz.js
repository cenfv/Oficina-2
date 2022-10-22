const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Por favor, insira uma descrição"],
  },
});

module.exports = mongoose.model("Quiz", quizSchema);