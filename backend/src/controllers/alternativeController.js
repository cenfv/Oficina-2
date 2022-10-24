const Alternative = require("../models/Alternative");

const handleErrors = (err) => {
  let errors = {};

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

exports.getAllAlternatives = async () => {
  const alternative = await Alternative.find();
  if (alternative) {
    return alternative;
  }
};

exports.getAlternativeById = async (id) => {
  const alternative = await Alternative.findById(id);
  if (alternative) {
    return alternative;
  }
};

exports.createAlternative = async (alternative) => {
  try {
    const res = Alternative.insertMany(alternative);
    return res;
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.updateAlternative = async (id, description) => {
  try {
    const alternative = await Alternative.findByIdAndUpdate(id, { description }, { new: true });
    return alternative;
  } catch (err) {
    const errors = handleErrors(err);
    throw errors;
  }
};

exports.deleteAlternative = async (id) => {
  try {
    const alternative = await Alternative.findByIdAndDelete(id);
    if (alternative) {
      return alternative;
    }
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    throw errors;
  }
};
