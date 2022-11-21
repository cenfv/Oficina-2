const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const checkToken = require("../helpers/checkToken");

router.get(
    "/",
    checkToken.checkTokenBearer,
    async (req, res, next) => {
        try {
            const submission = await submissionController.getAllSubmission();
            return res.status(200).json({
                submission,
            });
        } catch (err) {
            console.log(err);
            return res.status(404).json({
                msg: "Submission not found",
            });
        }
    }
);

router.get(
    "/:id",
    checkToken.checkTokenBearer,
    async (req, res, next) => {
        const submissionId = req.params.id;
        try {
            const submission = await submissionController.getSubmissionById(
                submissionId
            );
            return res.status(200).json({
                submission,
            });
        } catch (err) {
            console.log(err);
            return res.status(404).json({
                msg: "Submission not found",
            });
        }
    }
);

router.post("/:id", checkToken.checkTokenBearer, async (req, res, next) => {
    const questionAlternative = req.params.id;
    const { choice } = req.body;
    try {
      const submission = await submissionController.createSubmission(
        req.id,
        questionAlternative,
        choice
      );
      return res.status(201).json({
        submission,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        validationError: err,
      });
    }
  });
  
  module.exports = router;