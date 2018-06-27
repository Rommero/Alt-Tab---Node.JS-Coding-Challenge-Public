const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const { AUTH_SALT } = require("../config/");

const md5 = function(data) {
  return crypto
    .createHash("md5")
    .update(data)
    .digest("hex");
};

const userSchema = new Schema({
  name: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
  token: String
});

userSchema.statics.findByEmail = function(email) {
  return this.findOne({
    email
  });
};

userSchema.statics.findByToken = function(token) {
  return this.findOne({
    token
  });
};

userSchema.statics.register = function({ email, name, password }) {
  const UserModel = this.model("UserModel");
  const token = md5(new Date().toISOString() + AUTH_SALT);
  const passwordHash = md5(`${password}${AUTH_SALT}`);
  const user = new UserModel({
    password: passwordHash,
    email,
    name,
    token
  });

  return user.save();
};

userSchema.statics.findByCredentials = function({ email, password }) {
  const passwordHash = md5(`${password}${AUTH_SALT}`);
  return this.findOne({
    password: passwordHash,
    email,
  });
};

userSchema.methods.login = function() {
  this.token = md5(new Date().toISOString() + AUTH_SALT);
  return this.save();
};

userSchema.methods.logout = function() {
  this.token = null;
  return this.save();
};

module.exports = mongoose.model("UserModel", userSchema);
