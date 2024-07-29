const express = require("express");
const router = express.Router();
const userModel = require("../dao/models/user.model");
const { isValidPassword } = require("../utils/hashBcrypt");
const passport = require("passport");
const UserController = require("../controllers/user-controller");
const userController = new UserController();
const ViewsController = require("../controllers/views-controller");
const viewsController = new ViewsController();

// Login

router.post(
  "/sessionLogin",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/products",
  }),
  viewsController.viewProducts
);

router.get(
  "/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/sessions/githubcallback",
  passport.authenticate("github"),
  userController.loginGitHub
);
router.get("/profile", (req, res) => {
  if (req.session.usuario) {
    res.render("profile", { user: req.session.usuario });
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", userController.logOut);

module.exports = router;
