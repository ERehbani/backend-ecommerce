const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-manager-db.js");
const CartManager = require("../dao/db/cart-manager-db.js");
const cartManager = new CartManager();
const productManager = new ProductManager();

function viewsRouter() {
  router.get("/products", async (req, res) => {
    console.log(req.session.usuario)
    try {
      const { page = 1, limit = 5 } = req.query;
      const productos = await productManager.getProducts({
        page: parseInt(page),
        limit: parseInt(limit),
      });

      const nuevoArray = productos.docs.map((producto) => {
        const { _id, ...rest } = producto.toObject();
        return { _id, ...rest };
      });

      console.log({user: req.session.usuario});

      if(!req.session.login) res.redirect("/login")

      res.render("products", {
        nuevoArray,
        req: req.session.login,
        user: req.session.usuario
      });
    } catch (error) {
      console.error("Error al obtener productos", error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  });

  router.get("/product/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await productManager.getProductById(id);
      console.log({
        producto,
        productId: producto._id.toString(),
      });
      res.render("detail", {
        producto,
        productId: producto._id.toString(),
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/cart/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await cartManager.getCartById(cid);

      if (!cart) {
        console.log("No existe carrito con ese id");
        return res.status(400).json({ error: "Carrito no encontrado" });
      }
      const productsInCart = cart.products.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      }));
      console.log(productsInCart);
      res.render("cart", { products: productsInCart });
    } catch (error) {
      console.log("Error al obtener el carrito");
      res.status(500).json({ error: error });
    }
  });

  router.get("/login", async (req, res) => {
    res.render("login", { req: req.session.login });
  });

  router.get("/register", async (req, res) => {
    res.render("register")
  });

  return router;
}

module.exports = viewsRouter;
