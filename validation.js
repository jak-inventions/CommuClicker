// Validation
const Joi = require('@hapi/joi');

// Register Validation
const signUpValidation = (data) => {
  const schema = {
    username: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
}

const signInValidation = (data) => {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
  };
  return Joi.validate(data, schema);
}

module.exports.signUpValidation = signUpValidation;
module.exports.signInValidation = signInValidation;
