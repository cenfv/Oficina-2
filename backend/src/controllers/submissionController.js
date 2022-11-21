const Submission = require("../models/Submission");

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
      const submission = new Submission({
        user: userId,
        questionAlternative: questionAlternativeId,
        choice: choiceId,
      });
      const res = await submission.save();
      return res;
    } catch (err) {
      const errors = handleErrors(err);
      throw errors;
    }
  }