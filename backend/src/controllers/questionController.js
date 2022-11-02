const Question = require("../models/Question");
const quizController = require("../models/Quiz");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

exports.getAllQuestions = async () => {
  const question = await Question.find().populate("quiz");
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
  difficulty,
  quizId
) => {
  try {
    const quiz = await quizController.findById(quizId);
    const question = new Question({
      title,
      description,
      editionYear,
      difficulty,
      quiz
    });
    const res = await question.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.updateQuestion = async (
  id,
  title,
  description,
  editionYear,
  difficulty,
  quizId
) => {
  try {
    const quiz = await quizController.findById(quizId);
    const question = await Question.findByIdAndUpdate(id, {
      title,
      description,
      editionYear,
      difficulty,
      quiz
    }, { new: true });
    return question;

  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.deleteQuestion = async (id) => {
  const question = await Question.findByIdAndDelete(id);
  if (question) {
    return question;
  }
};