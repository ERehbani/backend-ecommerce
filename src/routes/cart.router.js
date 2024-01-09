const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/CartManager");
const cartManager = new CartManager("./src/models/carts.json");

router.post("/carts", async (req, res) => {
  try {
    const newCart = await cartManager.postCart();
    res.json(newCart);
  } catch (error) {
    console.log(error, "Error al crear un nuevo carrito");
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.get("/carts/:cid", async(req, res) => {
  const cartId = parseInt(req.params.cid)

  try {
    const cart = await cartManager.getCartById(cartId)
    res.json(cart.products)
  } catch (error) {
    console.log(error, "Error al obtener el carrito")
    res.status(500).json({error: "Error interno del servidor"})
  }
});


router.post("/carts/:cid/product/:pid", async(req,res) => {
  const cartId = parseInt(req.params.cid)
  const productId = req.params.pid
  const quantity = req.body.quantity || 1

  try {
    const updateCart = await cartManager.loadProductToCart(cartId, productId, quantity)
    res.json(updateCart.products)
  } catch (error) {
    console.log(error, "Error al sumar el producto al carrito")
    res.status(500).json({error: "Error interno del servidor"})
  }
})


module.exports = router;
