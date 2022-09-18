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

exports.updateUser = async (id, firstName, lastName, password, gender) => {
  try {
    let passwordHash = "";
    if (password && password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }
    const user = await User.findById(id);
    if (!password) {
      const res = await user.updateOne({
        firstName,
        lastName,
        gender,
      });
      return res;
    } else {
      const res = await user.updateOne({
        firstName,
        lastName,
        password: passwordHash,
        gender,
      });
      return res;
    }
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.deleteUser = async (id) => {
  try {
    const user = await User.findById(id);
    const res = await user.deleteOne();
    return res;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.getAllUsers = async () => {
  const user = await User.find();
  if (user) {
    return user;
  }
};

exports.userAuth = async (email, password) => {
  const user = await User.findOne({ email: email });
  const checkPassword = await bcrypt.compare(password, user.password);
  if (checkPassword) {
    return user;
  }
};

exports.getUserById = async (id) => {
  const user = await User.findById(id, "-password");
  if (user) {
    return user;
  }
};
