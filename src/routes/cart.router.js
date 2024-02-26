const express = require("express");
const router = express.Router();

const CartManager = require("../dao/db/cart-manager-db");
const cartModel = require("../dao/models/cart.model");
const cartManager = new CartManager();

router.post("/carts", async (req, res) => {
  try {
    const newCart = await cartManager.crearCart();
    if (newCart) {
      res.json({ message: "Carrito creado con éxito", cart: newCart });
    } else {
      res.status(404).json({ error: "No se pudo crear el carrito" });
    }
  } catch (error) {
    console.log(error, "Error al crear un nuevo carrito");
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.get("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await cartManager.getCartById(cartId);
    res.json(cart.products);
  } catch (error) {
    console.log(error, "Error al obtener el carrito");
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await cartModel.findByIdAndUpdate(cid, { products });
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// router.delete("/carts/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     await cartModel.findByIdAndDelete(cid);
//     res.json({ status: "success", message: "Carrito eliminado correctamente" });
//   } catch (error) {
//     res.status(401).json({ status: "error", message: error.message });
//   }
// });

router.post("/carts/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const updateCart = await cartManager.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.json(updateCart.products);
  } catch (error) {
    console.log(error, "Error al sumar el producto al carrito");
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/carts/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartManager.deleteProductFromCart(cid, pid);

    res.json({
      status: "success",
      message: "Producto eliminado correctamente del carrito",
      cart,
    });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

router.put("/carts/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    const products = cart.products.findIndex((product) => product._id === pid);
    if (products !== 1) {
      cart.products[products].quantity = quantity;
      await cart.save();
      res.json({
        status: "success",
        message: "La cantidad del producto fue actualizada",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.put("/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const updatedProducts = req.body;

    try {
      const updatedCart = await cartManager.updateCart(cartId, updatedProducts);
      res.json(updatedCart);
    } catch (error) {
      console.error("Error al actualizar el carrito", error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  } catch (error) {
    console.error("Error al actualizar el carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

router.put("/carts/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;
    const updatedCart = await cartManager.updateQuantity(
      cartId,
      productId,
      newQuantity
    );
    res.json({
      status: "success",
      message: "Cantidad del producto actualizada correctamente",
      updatedCart,
    });
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito",
      error
    );
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

router.delete("/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const updatedCart = await cartManager.cleanCart(cartId);

    res.json({
      status: "success",
      message:
        "Todos los productos del carrito fueron eliminados correctamente",
      updatedCart,
    });
  } catch (error) {
    console.error("Error al vaciar el carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
