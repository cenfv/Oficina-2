const Submission = require("../models/Submission");
const Alternative = require("../models/Alternative");
const QuestionAlternative = require("../models/QuestionAlternative");
const User = require("../models/User");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

exports.getAllSubmission = async () => {
  const submission = await Submission.find();
  if (submission) {
    return submission;
  }
};
exports.getSubmissionById = async (id) => {
  const submission = await Submission.findById(id);
  if (submission) {
    return submission;
  }
};

exports.deleteSubmission = async (id) => {
  try {
    const submission = await Submission.findByIdAndDelete(id);
    if (submission) {
      return submission;
    }
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.createSubmission = async (userId, questionAlternativeId, choiceId) => {
  try {
    const questionAlternative = await QuestionAlternative.findById(
      questionAlternativeId
    );
    const choice = await Alternative.findById(choiceId);
    const corretAlternative = await Alternative.findById(
      questionAlternative.correctAlternative
    );

    let isCorrect = false;
    if (JSON.stringify(choice) === JSON.stringify(corretAlternative)) {
      isCorrect = true;
    }

    const submission = new Submission({
      user: userId,
      questionAlternative: questionAlternativeId,
      choice: choiceId,
      correctChoice: isCorrect,
    });

    const res = await submission.save();
    return res;
  } catch (err) {
    console.log(err)
    const errors = handleErrors(err);
    throw errors;
  }
}

exports.getSubmissionByUserId = async (userId, page, pageSize) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      let submission = await Submission.aggregate([
        {
          $match: { user: user._id },
        },
        { $sort: { "data._id": 1 } },
        {
          $facet: {
            metadata: [{ $count: "total" }, { $addFields: { page: page } }],
            data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
          },
        },
      ]);

      submission = await Submission.populate(submission, {
        path: "data.questionAlternative",
        model: "QuestionAlternative",
      });

      submission = await Submission.populate(submission, {
        path: "data.questionAlternative.question",
        model: "Question",
      });

      return submission;
    }
    return null;

  } catch (err) {
    console.log(err);
  }
};

exports.getSubmissionStatistics = async (userId) => {
  try {
    const user = await User.findById(userId);
    const questionsQuantity = await QuestionAlternative.find().count();

    let submissions = await Submission.aggregate([
      {
        $match: { user: user._id },
      },
    ]);
    submissions = submissions.length;

    let submissionsGroupedByQuestion = await Submission.aggregate([
      {
        $match: { user: user._id },
      },
      {
        $group: {
          _id: "$questionAlternative",
          data: { $first: "$$ROOT" },
        },
      },
    ]);
    submissionsGroupedByQuestion = submissionsGroupedByQuestion.length;

    let correctSubmissions = await Submission.aggregate([
      {
        $match: { user: user._id, correctChoice: true },
      },
    ]);
    correctSubmissions = correctSubmissions.length;


    let correctSubmissionRate = (correctSubmissions / submissions) * 100;
    let progressRate = (submissionsGroupedByQuestion / questionsQuantity) * 100;
    let remainingQuestions = questionsQuantity - submissionsGroupedByQuestion;

    if (!correctSubmissionRate || !progressRate || !submissionsGroupedByQuestion) {
      return {
        progressRate: 0,
        correctSubmissionRate: 0,
        solvedQuantity: 0,
        remainingQuestions: questionsQuantity,
      }
    }
    return {
      progressRate,
      correctSubmissionRate,
      solvedQuantity: submissionsGroupedByQuestion,
      remainingQuestions,
    };

  } catch (err) {
    console.log(err);
  }
};