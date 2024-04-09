const ProductService = require("../services/product-service");
const productService = new ProductService();
const CartService = require("../services/cart-service")
const cartService = new CartService()

class ViewsController {
  async viewProducts(req, res) {
    console.log(req.session.usuario);
    try {
      const { page = 1, limit = 5 } = req.query;
      const productos = await productService.getProducts({
        page: parseInt(page),
        limit: parseInt(limit),
      });

      const nuevoArray = productos.docs.map((producto) => {
        const { _id, ...rest } = producto.toObject();
        return { _id, ...rest };
      });

      console.log({ user: req.session.usuario });

      if (!req.session.login) res.redirect("/login");

      res.render("products", {
        nuevoArray,
        req: req.session.login,
        user: req.session.usuario,
      });
    } catch (error) {
      console.error("Error al obtener productos", error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  }

  async viewDetail(req, res) {
    try {
      const { id } = req.params;
      const producto = await productService.getProductById(id);
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
  }

  async viewCartDetail(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartService.getCartById(cid);

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
  }

  async viewLogin(req, res) {
    res.render("login", { req: req.session.login });
  }

  async viewRegister(req, res) {
    res.render("register")
  }
}

module.exports = ViewsController;
