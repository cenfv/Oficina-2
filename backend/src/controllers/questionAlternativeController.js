const QuestionAlternative = require("../models/QuestionAlternative");
const questionController = require("./questionController");
const alternativeController = require("./alternativeController");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

exports.getAllQuestionAlternative = async () => {
  const questionAlternative = await QuestionAlternative.find(
    {},
    "-correctAlternative"
  );
  if (questionAlternative) {
    return questionAlternative;
  }
};
exports.getQuestionAlternativeById = async (id) => {
  const questionAlternative = await QuestionAlternative.findById(
    id,
    "-correctAlternative"
  );
  if (questionAlternative) {
    return questionAlternative;
  }
};

exports.createQuestionAlternative = async (
  questionId,
  alternativeId,
  correctAlternativeId
) => {
  try {
    var question = await questionController.getQuestionById(questionId);

    var alternatives = await Promise.all(
      alternativeId.map(async (alternative) => {
        const res = alternativeController.getAlternativeById(alternative);
        return res;
      })
    );
    var correctAlternative = await alternativeController.getAlternativeById(
      correctAlternativeId
    );

    const questionAlternative = new QuestionAlternative({
      question,
      alternative: alternatives,
      correctAlternative,
    });
    const res = await questionAlternative.save();

    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};
