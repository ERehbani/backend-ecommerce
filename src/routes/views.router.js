const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/ProductManager");

function viewsRouter(io) {
  const productManager = new ProductManager("./src/models/products.json");

  router.get("/", (req, res) => {
    const products = productManager.getProducts();
    res.render("home", { products });
  });

  router.get("/realtimeproducts", (req, res) => {
    const products = productManager.getProducts();
    res.render("realTimeProducts", { products });
  });

  io.on("connection", async (socket) => {
    console.log("Un usuario se conectó");
  
    // Lee los productos al conectar y emite la lista al cliente
    const products = await productManager.readFile();
    io.emit("products", products);
  
    socket.on("addProduct", (newProduct) => {
      productManager.addProduct(newProduct);
  
      // Emite la actualización de productos a todos los clientes
      io.emit("updateProducts", productManager.getProducts());
    });
  
    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });

  return router;
}

module.exports = viewsRouter;
