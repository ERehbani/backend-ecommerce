const CartService = require("../services/cart-service");
const cartSevice = new CartService();
const ProductService = require("../services/product-service");
const productService = new ProductService();
const UserService = require("../services/user-service");
const userService = new UserService();
const TicketModel = require("../dao/models/ticket.model");
const { generateUniqueCode, calcularTotal } = require("../utils/cartUtils");

class CartController {
  async createCart(req, res) {
    try {
      const newCart = new CartModel({ products: [] });
      const savedCart = await newCart.save();
      if (newCart) {
        res.json({ message: "Carrito creado con éxito", cart: newCart });
        return savedCart;
      } else {
        res.status(404).json({ error: "No se pudo crear el carrito" });
      }
    } catch (error) {
      console.log(error, "Error al crear un nuevo carrito");
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async getCartById(req, res) {
    const cartId = req.params.cid;

    try {
      const cart = await cartSevice.getCartById(cartId);
      res.json(cart.products);
    } catch (error) {
      console.log(error, "Error al obtener el carrito");
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async updateCart(req, res) {
    const cartId = req.params.cid;
    const updatedProducts = req.body;

    try {
      const updatedCart = await cartSevice.updateCart(cartId, updatedProducts);
      res.json(updatedCart);
    } catch (error) {
      console.error("Error al actualizar el carrito", error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  }
  async addProductToCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
      const updateCart = await cartSevice.addProductToCart(
        cartId,
        productId,
        quantity
      );
      res.json(updateCart.products);
    } catch (error) {
      console.log(error, "Error al sumar el producto al carrito");
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleteProductFromCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const cart = await cartSevice.deleteProductFromCart(cid, pid);

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
  }

  async updateQuantity(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await cartSevice.updateQuantity(cid, pid, quantity);
      res.json({
        status: "success",
        message: "Cantidad de producto actualizada correctamente",
        cart,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async deleteCart(req, res) {
    try {
      const cartId = req.params.cid;
      const updatedCart = await cartSevice.cleanCart(cartId);

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
  }

  async purchaseTicket(req, res) {
    try {
      const { cid } = req.params;
      console.log(cid);
      const cart = await cartSevice.getCartById(cid);
      const products = cart.products;

      const productsNotAvailable = [];

      for (const item of products) {
        const productId = item.product;
        const product = await productService.getProductById(productId);
        if (product.stock >= item.quantity) {
          product.stock -= item.quantity;
          await product.save();
        } else {
          productsNotAvailable.push(productId);
        }
      }

      const userWithCart = await userService.getCartsUser(cid);
      const ticket = new TicketModel({
        code: generateUniqueCode(),
        purchase_datetime: new Date(),
        amount: calcularTotal(cart.products),
        purchaser: userWithCart._id,
      });

      await ticket.save();

      cart.products = cart.products.filter((item) =>
        productsNotAvailable.some((productId) => productId.equals(item.product))
      );

      await cart.save()

     res.status(200).json({productsNotAvailable})
    } catch (error) {
      console.error("Error al vaciar el carrito", error);
      res.status(500).json({
        status: "error",
        error: "Error en el controlador al comprar un ticket",
      });
    }
  }
}

module.exports = CartController;
