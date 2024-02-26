const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-manager-db.js");
const CartManager = require("../dao/db/cart-manager-db.js");
const cartManager = new CartManager()
const productManager = new ProductManager();

function viewsRouter() {
  router.get("/products", async (req, res) => {
    try {
      const { page = 1, limit = 5 } = req.query;
      const productos = await productManager.getProducts({
        page: parseInt(page),
        limit: parseInt(limit),
      });

      const nuevoArray = productos.docs.map((producto) => {
        const { _id, ...rest } = producto.toObject();
        return rest;
      });
      console.log({
        productos: nuevoArray,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
        currentPage: productos.page,
        totalPages: productos.totalPages,
      });

      res.render("products", {
        productos: nuevoArray,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
        currentPage: productos.page,
        totalPages: productos.totalPages,
      });
    } catch (error) {
      console.error("Error al obtener productos", error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  });

  router.get("/cart/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await cartManager.getCartById(cid)
      
      if(!cart) {
        console.log("No existe carrito con ese id")
        return res.status(400).json({error: "Carrito no encontrado"})
      }
      const productsInCart = cart.products.map(item => ({
        product: item.product,
        quantity: item.quantity
      }))
      console.log(productsInCart)
      res.render("cart", { products: productsInCart });
    } catch (error) {
      console.log("Error al obtener el carrito")
      res.status(500).json({ error: error });
    }
  });

  return router;
}

module.exports = viewsRouter;
