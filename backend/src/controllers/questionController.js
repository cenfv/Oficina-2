const Question = require("../models/Question");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

exports.getAllQuestions = async () => {
  const question = await Question.find();
  if (question) {
    return question;
  }
};

exports.getQuestionById = async (id) => {
  const question = await Question.findById(id);
  if (question) {
    return question;
  }
};

exports.createQuestion = async (
  title,
  description,
  editionYear,
  difficulty
) => {
  try {
    const question = new Question({
      title,
      description,
      editionYear,
      difficulty,
    });
    const res = await question.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
