const fs = require("fs").promises;

class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.ultId = 0;

    this.loadCart();
  }

  async loadCart() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(data);
      if (this.carts.length > 0) {
        this.ultId = Math.max(...this.carts.map((cart) => cart.id));
      }
    } catch (error) {
      console.log("Error al cargar el carrito");
    }
  }

  async setCart() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }

  async postCart() {
    const newCart = {
      id: ++this.ultId,
      products: [],
    };
    this.carts.push(newCart);
    await this.setCart();
    return newCart;
  }

  async getCartById(cartId) {
    try {
      const cart = this.carts.find((cart) => cart.id === cartId);
      if (!cart) {
        throw new Error(`No existe un carrito id ${cartId}`);
      }

      return cart;
    } catch (error) {
      console.log({ error, message: "Error al obtener el carrito por id" });
      throw error;
    }
  }

  async loadProductToCart(cartId, productId, quantity = 1) {
    const cart = await this.getCartById(cartId);
    const productExist = cart.products.find(
      (product) => product.product === productId
    );

    if (productExist) {
      productExist.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await this.setCart();
    return cart;
  }
}

module.exports = CartManager;
