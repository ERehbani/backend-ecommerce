const express = require("express");
const router = express.Router();
const userModel = require("../dao/models/user.model");

// Login

router.post("/sessionLogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await userModel.findOne({ email: email });
    if (usuario) {
      if ((usuario.password === password) & (usuario.email === email)) {
        req.session.login = true;
        
        res.redirect("/products");
      } else res.status(400).send({ error: "El usuario es incorrecto ❌" });
    } else {
      res.status(400).send({ error: "El usuario es incorrecto ❌" });
    }
  } catch (error) {
    res.status(400).send({ error: "Error en el login ❌" });
  }
});

router.get("/logout", async (req, res) => {
  console.log(req.session);

  if (req.session.login) {
    req.session.destroy();
  }
  res.status(200).redirect("/login");
  // req.session.login = false;
  console.log("session cerrada", req.session.login);
});

module.exports = router;
