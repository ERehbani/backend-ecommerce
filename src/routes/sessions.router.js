const express = require("express");
const router = express.Router();
const userModel = require("../dao/models/user.model");
const { isValidPassword } = require("../utils/hashBcrypt");
const passport = require("passport");
const UserController = require("../controllers/user-controller");
const userController = new UserController();

// Login

router.post("/sessionLogin", userController.loginUser);

router.get(
  "/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/sessions/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  userController.loginGitHub
);

router.get("/logout", userController.logOut);

module.exports = router;
