var Joi = require("joi");

module.exports.register = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
    name: Joi.string().required()
  }
};

module.exports.login = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
};
