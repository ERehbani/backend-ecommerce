const express = require("express");
const ProductManager = require("./controllers/ProductManager");
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json())

app.use("/api", productsRouter);
app.use("/api", cartRouter);

app.listen("8080", () => {
  console.log("Funcando");
});
