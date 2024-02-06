const CartModel = require("../models/cart.model");

class CartManager {
  async crearCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.log("Error al crear el nuevo carrito");
      return null; 
    }
  }
  

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        console.log("No existe el carrito con el id" + cartId);
        return null;
      }

      return cart;
    } catch (error) {
      console.log("Error al traer el carrito por id");
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await this.getCartById(cartId);
      const existProduct = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (existProduct) {
        existProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      //   Marcar la propiedad products como modificada antes de guardar
      cart.markModified("products");

      await cart.save();
      return cart;
    } catch (error) {
      console.log("Error al agregar un producto", error);
    }
  }
}

module.exports = CartManager;
