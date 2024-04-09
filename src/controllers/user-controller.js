const { createHash, isValidPassword } = require("../utils/hashBcrypt");
const UserService = require("../services/user-service");
const userService = new UserService();

class UserController {
  async createUser(req, res) {
    if (!req.usuario)
      return res
        .status(400)
        .send({ status: "error", error: "No se pudo crear el usuario" });

    req.session.usuario = {
      first_name: req.usuario.first_name,
      last_name: req.usuario.last_name,
      password: createHash(req.usuario.password),
      email: req.usuario.email,
      age: req.usuario.age,
      role: "User",
    };
    req.session.login = true;
    res.redirect("/products");
  }

  async failedRegister(req, res) {
    res.send({ error: "Registro fallido" });
  }

  async currentUser(req, res) {
    console.log(req.session.usuario, "REQ:SESSION:TRUE");
    if (!req.session.usuario) {
      return res.json({
        message: "Debe estar autenticado para acceder a esta sección",
      });
    }
    res.json(req.session.usuario);
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    console.log(email);
    try {
      const usuario = await userService.getUserByEmail(email);
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
  }

  async loginGitHub(req, res) {
    console.log("req.user", req.user);
    req.session.usuario = req.user;
    req.session.login = true;
    req.session.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/products");
      }
    });
  }

  async logOut(req, res) {
    console.log(req.session);

    if (req.session.login) {
      req.session.destroy();
    }
    res.status(200).redirect("/login");
  }
}

module.exports = UserController;
