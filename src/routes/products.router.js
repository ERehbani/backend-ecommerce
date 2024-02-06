const express = require("express");
const router = express.Router();

const ProductManager = require("../dao/db/product-manager-db");
const productManager = new ProductManager();

router.get("/products", async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);
    const response = await productManager.getProdcuts();

    if (limit) {
      const slicedProducts = response.slice(0, limit);
      res.json(slicedProducts);
    } else {
      res.json(response);
    }

    console.log(`límite: ${limit}`);
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await productManager.getProductById(id);
    if (!response) {
      return res.json({
        error: "Producto no encontrado",
      });
    } else {
      return res.json(response); 
    }
  } catch (error) {
    console.log(`error: ${error}`);
    return res.status(500).json({ error: 'Error del servidor' }); 
  }
});


router.post("/products", async (req, res) => {
  const newProduct = req.body;
  try {
    await productManager.addProduct(newProduct);

    res.status(201).json({
      message: "Producto agregado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/products/:pid", async (req, res) => {
  let id = req.params.pid;
  const product = await req.body;
  try {
    await productManager.updateProduct(id, product);
    res.json({
      message: "Producto actualizado exitosamente",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/products/:pid", async (req, res) => {
  const id = req.params.pid;
  try {
    const deletedProduct = await productManager.deleteProduct(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .send({ message: "El producto que desea borrar, no existe" });
    }

    res.status(200).send({
      message: "Producto eliminado correctamente",
      deletedProduct: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

module.exports = router;
