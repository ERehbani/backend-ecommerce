const CartService = require("../services/cart-service");
const cartSevice = new CartService();
const ProductService = require("../services/product-service");
const productService = new ProductService();
const UserService = require("../services/user-service");
const userService = new UserService();
const TicketModel = require("../dao/models/ticket.model");
const { generateUniqueCode, calcularTotal } = require("../utils/cartUtils");
const {
  generateErrorNew,
  generateErrorGetId,
  generateErrorUpdate,
  generateErrorProductToCart,
  generateErrorDelete,
  generateErrorDeleteProductFromCart,
  generateErrorUpdateQuantity,
} = require("../services/errors/info");
const { EErrors } = require("../services/errors/enums");
const CustomError = require("../services/errors/custom-error");

class CartController {
  async createCart(req, res) {
    try {
      const newCart = new CartModel({ products: [] });
      const savedCart = await newCart.save();
      if (newCart) {
        res.json({ message: "Carrito creado con éxito", cart: newCart });
        return savedCart;
      }
      CustomError.crearError({
        nombre: "Crear un carrito",
        causa: generateErrorNew(),
        mensaje: "Error al crear un carrito",
        codigo: EErrors.TIPO_INVALIDO,
      });
      res.status(404).json({ error: "No se pudo crear el carrito" });
    } catch (error) {
      req.logger.error(error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async getCartById(req, res) {
    const cartId = req.params.cid;
    const user = req.session.usuario;

    try {
      const cart = await cartSevice.getCartById(cartId);

      if (!cart) {
        CustomError.crearError({
          nombre: "Traer carrito por id",
          causa: generateErrorGetId(id),
          mensaje: "Error al intentar traer carrito por id",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      const plainProducts = cart.products.map((item) => ({
        productTitle: item.product.title,
        productId: item.product.id,
        productPrice: item.product.price,
        quantity: item.quantity,
        allProduct: item.id,
      }));

      res.render("cart", { products: plainProducts, user });
    } catch (error) {
      req.logger.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async updateCart(req, res) {
    const cartId = req.params.cid;
    const updatedProducts = req.body;

    try {
      const updatedCart = await cartSevice.updateCart(cartId, updatedProducts);
      if (!updatedCart) {
        CustomError.crearError({
          nombre: "Actualizar carrito",
          causa: generateErrorUpdate(cartId, updatedProducts),
          mensaje: "Error al actualizar el carrito",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      res.json(updatedCart);
    } catch (error) {
      req.logger.error(error);
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
      if (!updateCart) {
        CustomError.crearError({
          nombre: "Agregar producto al carrito",
          causa: generateErrorProductToCart(cartId, productId, quantity),
          mensaje: "Error al agregar producto al carrito",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
    } catch (error) {
      req.logger.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleteProductFromCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const cart = await cartSevice.deleteProductFromCart(cid, pid);
      if (!cart) {
        CustomError.crearError({
          nombre: "Eliminar producto del carrito",
          causa: generateErrorDeleteProductFromCart(cid, pid),
          mensaje: "Error al eliminar producto del carrito",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      res.json({
        status: "success",
        message: "Producto eliminado correctamente del carrito",
        cart,
      });
    } catch (error) {
      req.logger.error(error);
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
      if (!cart) {
        CustomError.crearError({
          nombre: "Actualizar cantidad",
          causa: generateErrorUpdateQuantity(cid, pid, quantity),
          mensaje: "Error al modificar la cantidad del producto en el carrito",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      res.json({
        status: "success",
        message: "Cantidad de producto actualizada correctamente",
        cart,
      });
    } catch (error) {
      req.logger.error(error);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async deleteCart(req, res) {
    const cartId = req.params.cid;
    try {
      const deletedCart = await cartSevice.cleanCart(cartId);
      if (!deletedCart) {
        CustomError.crearError({
          nombre: "Eliminar carrito",
          causa: generateErrorDelete(cartId),
          mensaje: "Error al eliminar carrito",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      res.json({
        status: "success",
        message:
          "Todos los productos del carrito fueron eliminados correctamente",
        deletedCart,
      });
    } catch (error) {
      req.logger.error(error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  }

  async purchaseTicket(req, res) {
    const { cid } = req.params;
    const cart = await cartSevice.getCartById(cid);

    const products = cart.products;
    try {
      if (cart.products[0].quantity > products.stock || !products.stock) {
        return res.status(401).json({
          "La compra no puede ser realizada ya que no hay el stock necesario de este producto":
            products,
        });
      }

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

      if (!ticket) {
        CustomError.crearError({
          nombre: "Realizar compra",
          causa: generateErrorPurchaseTicket(cart, cid, products),
          mensaje: "Error al realizar una compra",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      req.logger.info(ticket);
      await ticket.save();

      cart.products = cart.products.filter((item) =>
        productsNotAvailable.some((productId) => productId.equals(item.product))
      );

      await cart.save();

      res.status(200).json({
        ticket,
        product: {
          title: products.title,
          price: products.price,
          stock: products.stock,
          category: products.category,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: "Error en el controlador al comprar un ticket",
      });
    }
  }
}

module.exports = CartController;
