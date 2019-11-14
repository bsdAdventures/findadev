const Validator = require("validator");
const { isEmpty } = require("../functions");

module.exports = function validate_post(data) {
  let errors = {};

  //check data to see if they are empty
  //if it is empty...if statements below get called

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 250 })) {
    errors.text = "Post must be between 10 and 250 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
