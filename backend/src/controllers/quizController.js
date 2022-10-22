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
    const quiz = await Quiz.findById(id);
    if (quiz) {
      const res = await Quiz.updateOne({
        description,
      });
      return res;
    }
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};