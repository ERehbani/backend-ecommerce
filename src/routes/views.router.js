const express = require("express");
const router = express.Router();
const ProductManager = require("../services/product-service.js");
const CartManager = require("../services/cart-service.js");
const cartManager = new CartManager();
const productManager = new ProductManager();
const ViewsController = require("../controllers/views-controller.js");
const viewsController = new ViewsController();

function viewsRouter() {
  router.get("/products", viewsController.viewProducts);

  router.get("/product/:id", viewsController.viewDetail);

  router.get("/cart/:cid", viewsController.viewCartDetail);

  router.get("/login", viewsController.viewLogin);

  router.get("/register", viewsController.viewRegister);

  router.get("/profile", viewsController.viewPerfil);

  router.get("/", (req, res) => res.render("home"));

  router.get("/realtimeproducts", viewsController.realTimeProducts)

  router.get("/chat", viewsController.chat)

  return router;
}

module.exports = viewsRouter;
