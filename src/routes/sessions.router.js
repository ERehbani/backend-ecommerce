const express = require("express");
const router = express.Router();
const userModel = require("../dao/models/user.model");
const { isValidPassword } = require("../utils/hashBcrypt");
const passport = require("passport");

// Login

router.post("/sessionLogin", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const usuario = await userModel.findOne({ email: email });
    if (usuario) {
      if (isValidPassword(usuario, password)) {
        req.session.login = true;
        req.session.usuario = usuario;
        res.redirect("/products");
      } else {
        res.status(400).send({ error: "Contraseña incorrecta ❌" }); 
      }
    } else {
      res.status(400).send({ error: "El usuario no existe ❌" });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(400).send({ error: "Error en el login ❌" });
  }
});

router.get(
  "/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/sessions/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log("req.user", req.user);
    req.session.usuario = req.user;
    req.session.login = true;
    // Move the redirect inside the callback
    req.session.save(function (err) {
      // session saved
      if (err) {
        console.log(err);
      } else {
        res.redirect("/products");
      }
    });
  }
);

router.get("/logout", async (req, res) => {
  console.log(req.session);

  if (req.session.login) {
    req.session.destroy();
  }
  res.status(200).redirect("/login");
  // req.session.login = false;
  // console.log("session cerrada", req.session.login);
});

module.exports = router;
