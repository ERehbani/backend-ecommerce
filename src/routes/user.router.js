const express = require("express");
const router = express();
const UserModel = require("../dao/models/user.model");
const { createHash } = require("../utils/hashBcrypt");
const passport = require("passport");
const UserController = require("../controllers/user-controller");
const upload = require("../middleware/multer");
const userController = new UserController();

// Post para generar un usuario y almacenarlo en mongoDB
// router.post("/sessions", async (req, res) => {
//   let { first_name, last_name, email, password, age, role } = req.body;

//   if (!first_name || !last_name || !email || !password || !age) {
//     res.status(201).send({ error: "Todos los campos son obligatorios" });
//     return;
//   }

//   if (!role) {
//     role = "usuario";
//   } else if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
//     role = "admin";
//   }

//   try {
//     const response = await UserModel.create({
//       first_name,
//       last_name,
//       email,
//       password: createHash(password),
//       age,
//       role,
//     });

//     res.status(200);
//     console.log("and its too soon, too far");
//     // res.send({ message: "Usuario creado ✅", data: response });
//     res.render("/register")
//     res.redirect("/login")
//     return response;
//   } catch (error) {
//     res.status(400).send(error);
//     console.log(error);
//   }
// });

// VERSION PARA PASSPORT:

router.post(
  "/sessions",
  // passport.authenticate("register", {
  //   failureRedirect: "/failedregister",
  // }),
  userController.createUser
);

router.get("/failedregister", userController.failedRegister);

router.get("/users", userController.getAllUsers);

router.get("/profile", userController.currentUser);

router.get("/users/premium/:uid", userController.premiumUser);


router.post(
  "/users/:uid/documents",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "productImage", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  userController.makePremium
);

router.post("/reset-password-request", userController.requresPasswordReset);

router.post("/reset-password", userController.resetPassword);

// Rutas para test
router.delete("/users/:email", userController.deleteUserByEmail);

router.delete("/users", userController.deleteByInactivity)
module.exports = router;
