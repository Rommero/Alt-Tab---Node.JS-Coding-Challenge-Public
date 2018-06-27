const express = require("express");
const router = express.Router();
const validate = require("express-validation");

const { handleErrors } = require("../utils")
const validators = require("../utils/validation/auth")
const controller = require("../controllers/auth")

router.get("/logout", handleErrors(controller.logout));
router.post("/register", validate(validators.register), handleErrors(controller.register));
router.post("/login", validate(validators.login), handleErrors(controller.login));

module.exports = router
