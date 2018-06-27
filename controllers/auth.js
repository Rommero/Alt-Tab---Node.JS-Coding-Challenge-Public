const UserModel = require("../models/user");
const { ValidationError } = require("express-validation");

module.exports.register = async (req, res, next) => {
  const { email, name, password } = req.body;

  const userCheck = await UserModel.findByEmail(email);

  if (userCheck) {
    throw new ValidationError([], {
      status: 400,
      statusText: `User with e-mail '${email}' already exists`
    });
  }

  const user = await UserModel.register({ email, name, password });

  res.status(201).send({
    token: user.token
  });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findByCredentials({ email, password });

  if (!user) {
    throw new ValidationError([], {
      status: 400,
      statusText: `Wrong credentials`
    });
  }

  await user.login();

  res.send({
    token: user.token
  });
};

module.exports.logout = async (req, res, next) => {
  if (req.user) {
    await req.user.logout();
  }

  return res.sendStatus(200);
};
