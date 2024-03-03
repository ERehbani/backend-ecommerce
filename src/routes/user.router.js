const express = require("express");
const router = express();
const UserModel = require("../dao/models/user.model");

// Post para generar un usuario y almacenarlo en mongoDB
router.post("/sessions", async (req, res) => {
  let { first_name, last_name, email, password, age, role } = req.body;

  if (!first_name || !last_name || !email || !password || !age) {
    res.status(201).send({ error: "Todos los campos son obligatorios" });
    return;
  }

  if (!role) {
    role = "usuario";
  } else if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    role = "admin";
  }

  try {
    const response = await UserModel.create({
      first_name,
      last_name,
      email,
      password,
      age,
      role,
    });

    res.status(200);
    console.log("and its too soon, too far");
    // res.send({ message: "Usuario creado ✅", data: response });
    res.render("/register")
    res.redirect("/login")
    return response;
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;
