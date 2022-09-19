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
