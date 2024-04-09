const express = require("express");
const router = express.Router();

const CartController = require("../controllers/cart-controller");
const cartController = new CartController();

router.post("/carts", cartController.createCart);

router.get("/carts/:cid", cartController.getCartById);

router.put("/carts/:cid", cartController.updateCart);

router.post("/carts/:cid/product/:pid", cartController.addProductToCart);

router.delete("/carts/:cid/product/:pid", cartController.deleteProductFromCart);

router.put("/carts/:cid/product/:pid", cartController.updateQuantity);

router.delete("/carts/:cid", cartController.deleteCart);

module.exports = router;
