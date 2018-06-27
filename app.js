"use strict";

const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { ValidationError } = require("express-validation");
const mongoose = require("mongoose");

const authMiddleware = require("./middlewares/bearerAuth");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const { DB_CONNSTRING } = require("./config");

mongoose.Promise = Promise;
mongoose.connect(DB_CONNSTRING).catch(err => {
  console.log("Failed to connect to MongoDB");
  process.exit(-1);
});

app.use(express.static(path.join(__dirname, "/app_client")));
app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.json());
app.use(authMiddleware);
app.use("/api", authRoutes);
app.use("/api", profileRoutes);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.status).json(err);
  }

  return res.sendStatus(500);
});

module.exports = app;
