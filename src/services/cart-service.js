const CartModel = require("../dao/models/cart.model");

class CartService {
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
      const cart = await CartModel.findById(cartId).populate('products');
      if (!cart) {
        console.log("No existe el carrito con el id" + cartId);
        return null;
      }

      return cart;
    } catch (error) {
      console.log("Error al traer el carrito por id");
      throw error
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
      console.log("Error al eliminar el producto del carrito");
      throw error;
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
      console.error("Error al actualizar el carrito en el gestor", error);
      throw error;
    }
  }

  async updateQuantity(cartId, productId, newQuantity) {
  try {
    const cart = await CartModel.findById(cartId);
    const products = cart.products.findIndex((product) => product._id === productId);
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

      if(!cart) {
        throw new Error("Carrito no encontrado")
      }

      return cart
    } catch (error) {
      console.log("Error al vaciar el carrito", error)
      throw error
    }
  }
}

module.exports = CartService;
