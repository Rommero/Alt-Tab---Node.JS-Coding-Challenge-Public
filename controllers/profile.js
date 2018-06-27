const UserModel = require("../models/user");
const { ValidationError } = require("express-validation");

module.exports.profile = async (req, res, next) => {
  if (!req.user) {
    throw new ValidationError([], {
      status: 401,
      statusText: "Access denied"
    });
  }

  return res.send({
    name: req.user.name,
    email: req.user.email
  });
};
