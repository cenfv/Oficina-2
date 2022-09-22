const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Por favor, digite um nome"],
  },
  lastName: {
    type: String,
    required: [true, "Por favor, digite o último nome"],
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "Por favor, digite seu email"],
    lowercase: true,
    validate: [isEmail, "Por favor, insira um email válido"],
  },
  password: {
    type: String,
    required: [
      true,
      "Por favor, entre com uma senha de no mínimo 6 caracteres",
    ],
    minlength: [6, "Mínimo de 6 caracteres"],
  },
  gender: {
    type: String,
    required: [true, "Por favor selecione uma opção de gênero"],
  },
  role: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
