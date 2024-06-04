const CartModel = require("../dao/models/cart.model");
const ProductModel = require("../dao/models/product.model");
const ProductService = require("./product-service");
const productService = new ProductService();

class CartService {
  async crearCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      return null;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId).populate("products");
      if (!cart) {
        console.log(`No existe el carrito con el id ${cartId}`);
        return null;
      }

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(cartId, productId, quantity, stock) {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      throw new Error(`No existe el carrito con el id ${cartId}`);
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
      cart.products[productIndex].stock = stock; // Update stock here
    } else {
      cart.products.push({ product: productId, quantity, stock }); // Add stock here
    }

    return cart.save();
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = cart.products.filter(
        (item) => item.product._id.toString() !== productId
      );

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCart(cartId, updatedProducts) {
    try {
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = updatedProducts;

      cart.markModified("products");
      await cart.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await CartModel.findById(cartId);
      const products = cart.products.findIndex(
        (product) => product._id === productId
      );
      if (products !== 1) {
        cart.products[products].quantity = newQuantity;
        await cart.save();
        res.json({
          status: "success",
          message: "La cantidad del producto fue actualizada",
        });
      }
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async cleanCart(cartId) {
    try {
      const cart = await CartModel.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
      );

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async purchaseTicket(cartID) {
    try {
      const cart = await CartModel.findById(cartID);
      console.log(cart);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CartService;
