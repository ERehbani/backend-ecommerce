const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");
const generateProducts = require("../utils/generateProducts");
const productController = new ProductController()

router.get("/products", productController.getProducts);

router.get("/products/:id", productController.getProductsById);

router.post("/products", productController.createProduct);

router.put("/products/:pid", productController.updateProduct);

router.delete("/products/:pid", productController.deleteProduct);


///////////////////////MOCKING PRODUCTS////////////////////////////////
router.get("/mockingproducts", (req, res) => {
    const products = generateProducts();
    res.json(products);
  });

module.exports = router;
