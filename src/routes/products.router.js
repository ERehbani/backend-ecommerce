const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller")
const productController = new ProductController()

router.get("/products", productController.getProducts);

router.get("/products/:id", productController.getProductsById);

router.post("/products", productController.createProduct);

router.put("/products/:pid", productController.updateProduct);

router.delete("/products/:pid", productController.deleteProduct);


module.exports = router;
