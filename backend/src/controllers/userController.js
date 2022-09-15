const User = require("../models/User");

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
    const user = new User({
      firstName,
      lastName,
      email,
      password,
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
