const express = require("express");
const passport = require("passport");
const passportService = require("../services/passport");
const requireLogin = passport.authenticate("local", { session: false });
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/", authController.signup);
router.post("/signin", requireLogin, authController.signin);

module.exports = router;
