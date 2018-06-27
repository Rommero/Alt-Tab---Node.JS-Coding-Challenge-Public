const express = require("express");
const router = express.Router();
const validate = require("express-validation");

const { handleErrors } = require("../utils")
const controller = require("../controllers/profile")

router.get("/profile", handleErrors(controller.profile));

module.exports = router
