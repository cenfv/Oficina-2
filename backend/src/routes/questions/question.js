const express = require("express");
const router = express.Router();
const questionController = require("../../controllers/questionController");
const checkToken = require("../../helpers/checkToken");

router.get("/", checkToken.checkTokenBearer, async (req, res, next) => {
  try {
    const questions = await questionController.getAllQuestions();
    return res.status(200).json({
      questions,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Question not found",
    });
  }
});

router.get("/:id", checkToken.checkTokenBearer, async (req, res, next) => {
  const questionId = req.params.id;
  try {
    const question = await questionController.getQuestionById(questionId);
    return res.status(200).json({
      question,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Question not found",
    });
  }
});

router.post(
  "/",
  checkToken.checkTokenBearer,

  async (req, res, next) => {
    const { title, description, editionYear, difficulty, quiz } = req.body;
    try {
      const question = await questionController.createQuestion(
        title,
        description,
        editionYear,
        difficulty,
        quiz
      );
      return res.status(201).json({
        question,
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);

router.put(
  "/:id",
  checkToken.checkTokenBearer,

  async (req, res) => {
    const { title, description, editionYear, difficulty, quiz } = req.body;
    try {
      const question = await questionController.updateQuestion(
        req.params.id,
        title,
        description,
        editionYear,
        difficulty,
        quiz
      );
      return res.status(200).json({
        question,
      });
    } catch (err) {
      return res.status(400).json({
        validationError: err,
      });
    }
  }
);


module.exports = router;
