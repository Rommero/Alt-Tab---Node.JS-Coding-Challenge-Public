const { ValidationError } = require("express-validation");

const UserModel = require("../models/user");
const { handleErrors } = require("../utils");

module.exports = handleErrors(async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const tokenRegexpRes = /Bearer\s(.*)/.exec(req.headers.authorization);
    const token = tokenRegexpRes[1];

    const user = await UserModel.findByToken(token);

    if (!user) {
      throw new ValidationError([], {
        status: 400,
        statusText: "Invalid authorization token"
      });
    } else {
      req.user = user;
    }
  }
  next();
});
