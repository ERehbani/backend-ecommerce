const { createHash, isValidPassword } = require("../utils/hashBcrypt");
const UserService = require("../services/user-service");
const UserDTO = require("../dto/user.dto");
const userService = new UserService();
const CartModel = require("../dao/models/cart.model");
const UserModel = require("../dao/models/user.model");
const CartService = require("../services/cart-service");
const cartService = new CartService();

class UserController {
  async createUser(req, res) {
    try {
      const { first_name, last_name, email, password, age } = req.body;

      const userExist = await userService.getUserByEmail(email);
      if (userExist) return res.status(400).send("El usuario ya existe");

      const createCart = await cartService.crearCart();
      console.log(createCart);
      const newCart = await createCart.save();
      console.log("NEW CART", newCart);

      const newUser = new UserModel({
        first_name,
        last_name,
        email,
        cart: newCart._id,
        password: createHash(password),
        age,
        role: "User",
      });

      await newUser.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al crear un usuario en el controlador");
    }
  }

  async failedRegister(req, res) {
    res.send({ error: "Registro fallido" });
  }

  async currentUser(req, res) {
    if (!req.session.usuario) {
      res.redirect("/login");
    }
    const userDTO = new UserDTO(
      req.session.usuario.first_name,
      req.session.usuario.last_name,
      req.session.usuario.role
    );
    console.log(req.session.usuario.role);
    const isAdmin = req.session.usuario.role === "Admin";
    console.log({ "ADDDMIIINN:": isAdmin });
    res.render("profile", { user: userDTO, isAdmin });
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
          console.log({ usuarioInController: req.session.usuario });
          res.redirect("/profile");
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
    req.session.save((err) => {
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
