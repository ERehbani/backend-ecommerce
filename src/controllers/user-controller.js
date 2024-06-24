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
const nodemailer = require("nodemailer");

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

      const result = await newUser.save();
      res.redirect("/login");
      return result;
    } catch (error) {
      req.logger.error(error);
      res.status(500).send("Error al crear un usuario en el controlador");
    }
  }

  async deleteUserByEmail(req, res) {
    const email = req.params.email;
    try {
      const result = await UserModel.findOneAndDelete({ email: email });
      if (!result) {
        return res.status(404).send({ error: "Usuario no encontrado" });
      }

      res.status(200).send({ message: "Usuario eliminado con éxito" });
    } catch (error) {
      res.status(500).send({ error: "Error interno del servidor" });
    }
  }

  async failedRegister(req, res) {
    res.send({ error: "Registro fallido" });
  }

  async getAllUsers(req, res) {
    const users = await userService.getAllUsers();

    const filterUsers = users.map((user) => ({
      last_connection: user.last_connection,
    }));
    const date = new Date();
    console.log(date.getDate());
    return filterUsers;
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
    console.log("USUARIO", req.user._id);
    await UserModel.findByIdAndUpdate(req.user._id, {
      last_connection: new Date(),
    });
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
        return res.redirect("/reset-password");
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

  async premiumUser(req, res) {
    try {
      console.log(req.session.usuario);
      const newRole =
        req.session.usuario.role === "Premium" ? "User" : "Premium";

      const user = await userService.updateUserRoleByEmail(
        req.session.usuario.email,
        newRole
      );

      req.session.destroy();
      res.redirect("/login");
      console.log("usuarioooooo", user);
      return user;
    } catch (error) {
      console.log(error);
      req.logger.error(error);
    }
  }

  async makePremium(req, res) {
    try {
      const userId = req.params.uid;
      const documentPath = req.file.path;

      // Actualiza el modelo del usuario con el nuevo documento
      await UserModel.findByIdAndUpdate(userId, {
        $push: {
          documents: {
            name: req.file.originalname,
            reference: documentPath,
          },
        },
        last_connection: new Date(),
      });

      res.status(200).json({
        message: "Documento cargado y usuario actualizado exitosamente.",
      });
    } catch (error) {
      res.status(500).json({ message: "Error al cargar el documento.", error });
    }
  }

  async deleteByInactivity(req, res) {
    try {
      const now = new Date();
      const thresholdDate = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

      const inactiveUsers = await UserModel.find({
        last_connection: { $lt: thresholdDate },
      });

      if (inactiveUsers.length === 0) {
        return res.status(200).send({ message: "No hay usuarios inactivos." });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: "eliancoderhouse@gmail.com",
          pass: "mvrs dgwe ixfy gzam",
        },
      });

      // biome-ignore lint/style/useConst: <explanation>
      for (let user of inactiveUsers) {
        const mailOptions = {
          from: "eliancoderhouse@gmail.com",
          to: user.email,
          subject: "Cuenta eliminada por inactividad",
          text: `Hola ${user.first_name},\n\nTu cuenta ha sido eliminada por inactividad.\n\nSaludos,\nEl equipo de Soporte`,
        };
        await transporter.sendMail(mailOptions);
        await UserModel.findByIdAndDelete(user._id);
      }
      res
        .status(200)
        .send({ message: "Usuarios inactivos eliminados y notificados" });

      res.status(200).send({ inactiveUsers });
    } catch (error) {
      res.status(500).send({ error: "Error eliminando usuarios inactivos" });
    }
  }
}

module.exports = UserController;
