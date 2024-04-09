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

  return router;
}

module.exports = viewsRouter;
