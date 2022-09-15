const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", async (req, res, next) => {
  const targetId = req.params.id;
  try {
    const user = await userController.getAllUser(targetId);
    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "User not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { firstName, lastName, email, password, gender } = req.body;
  try {
    const user = await userController.createUser(
      firstName,
      lastName,
      email,
      password,
      gender
    );
    return res.status(201).json({
      user,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});

module.exports = router;
