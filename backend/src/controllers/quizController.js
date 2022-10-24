const Quiz = require("../models/Quiz");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

exports.createQuiz = async (description) => {
  try {
    const quiz = new Quiz({
      description,
    });
    const res = await quiz.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.getAllQuizzes = async () => {
  const quiz = await Quiz.find();
  if (quiz) {
    return quiz;
  }
};

exports.getQuizById = async (id) => {
  const quiz = await Quiz.findById(id);
  if (quiz) {
    return quiz;
  }
};

exports.updateQuiz = async (id, description) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(id, { description }, { new: true });
    return quiz;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.deleteQuiz = async (id) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(id);
    if (quiz) {
      return quiz;
    }
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    throw errors;
  }
};