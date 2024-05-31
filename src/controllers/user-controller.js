const { createHash, isValidPassword } = require("../utils/hashBcrypt");
const UserService = require("../services/user-service");
const UserDTO = require("../dto/user.dto");
const userService = new UserService();
const CartModel = require("../dao/models/cart.model");
const UserModel = require("../dao/models/user.model");
const CartService = require("../services/cart-service");
const CustomError = require("../services/errors/custom-error");
const cartService = new CartService();
const {
  generateErrorUser,
  generateErrorLoginGithub,
} = require("../services/errors/info");
const { EErrors } = require("../services/errors/enums");
const { generateResetToken } = require("../utils/tokenReset");
const EmailManager = require("../utils/email");
const emailManager = new EmailManager();

class UserController {
  async createUser(req, res) {
    try {
      const { first_name, last_name, email, password, age } = req.body;

      const userExist = await userService.getUserByEmail(email);
      req.logger.info(userExist);
      if (userExist) return res.status(400).send("El usuario ya existe");

      const createCart = await cartService.crearCart();
      req.logger.info(createCart);
      const newCart = await createCart.save();
      req.logger.info("NEW CART", newCart);

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
      req.logger.error(error);
      res.status(500).send("Error al crear un usuario en el controlador");
    }
  }

  async failedRegister(req, res) {
    res.send({ error: "Registro fallido" });
  }

  async getAllUsers(req, res) {
    const users = await userService.getAllUsers()
    res.json(users)
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
    const isAdmin = req.session.usuario.role === "Admin";
    res.render("profile", { user: userDTO, isAdmin });
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    req.logger.info(email);
    try {
      const usuario = await userService.getUserByEmail(email);
      if (usuario) {
        if (isValidPassword(usuario, password)) {
          req.session.login = true;
          req.session.usuario = usuario;
          req.logger.info({ usuarioInController: req.session.usuario });
          res.redirect("/profile");
        } else {
          res.status(400).send({ error: "Contraseña incorrecta ❌" });
        }
      } else {
        res.status(400).send({ error: "El usuario no existe ❌" });
      }
    } catch (error) {
      req.logger.error("Error in login:", error);
      res.status(400).send({ error: "Error en el login ❌" });
    }
  }

  async loginGitHub(req, res) {
    req.session.usuario = req.user;
    req.session.login = true;
    req.session.save((err) => {
      if (err) {
        CustomError.crearError({
          nombre: "Github Login",
          causa: generateErrorLoginGithub(
            req.session.usuario,
            req.session.login
          ),
          mensaje: "Error al iniciar sesion con Github",
          codigo: EErrors.TIPO_INVALIDO,
        });
      } else {
        res.redirect("/products");
      }
    });
  }

  async logOut(req, res) {
    if (req.session.login) {
      req.session.destroy();
    }
    res.status(200).redirect("/login");
  }

  //////////////// NODE MAILER //////////////////////////////
  async requresPasswordReset(req, res) {
    const { email } = req.body;
    req.logger.info(email);
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      const token = generateResetToken();

      user.resetToken = {
        token: token,
        expiresAt: new Date(Date.now() + 3600000),
      };

      req.logger.info(user.resetToken);

      await user.save();

      await emailManager.sendMailResetPassword(email, user.first_name, token);
      res.redirect("/send-confirmation");
    } catch (error) {
      req.logger.error(error);
      res.status(500).send("Error en el controlador al enviar un email");
    }
  }

  async resetPassword(req, res) {
    const { email, password, token } = req.body;

    req.logger.info(email);
    req.logger.info(password);
    req.logger.info(token);
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      if (user.resetToken.token !== token) {
        return res.status(404).send("El token ingresado no es válido");
      }

      const resetToken = user.resetToken;
      if (!resetToken || resetToken.token !== token) {
        return res.status(404).send("El token ingresado no es válido");
      }

      const now = new Date();
      if (now > resetToken.expiresAt) {
        return res.redirect("/reset-password")
      }

      if (isValidPassword(user, password)) {
        return res
          .status(404)
          .send("La nueva contraseña no puede ser igual a la anterior");
      }

      user.password = createHash(password);
      user.resetToken = undefined;
      await user.save();

      return res.redirect("/login");
    } catch (error) {
      console.log(error);
      req.logger.error(error);
      return res
        .status(500)
        .send("Error al restablecer la contraseña en el controlador");
    }
  }
}

module.exports = UserController;
