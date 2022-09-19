const mongoose = require("mongoose");

const questionAlternativeSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  alternative: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alternative",
      required: true,
    },
  ],
  correctAlternative: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alternative",
      required: true,
    },
  ],
});

module.exports = mongoose.model(
  "QuestionAlternative",
  questionAlternativeSchema
);
