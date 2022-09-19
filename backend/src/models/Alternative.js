const mongoose = require("mongoose");

const alternativeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Por favor, insira uma descrição"],
  },
});

module.exports = mongoose.model("Alternative", alternativeSchema);
