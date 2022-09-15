const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
  let errors = {};
  if (err.name === "MongoServerError" && err.code === 11000) {
    errors["email"] = "o email fornecido já se encontra cadastrado";
  } else {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

exports.createUser = async (firstName, lastName, email, password, gender) => {
  try {
    let passwordHash = "";
    if (password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
    });
    const res = await user.save();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.getAllUser = async () => {
  const user = await User.find();
  if (user) {
    return user;
  }
};
