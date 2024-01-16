const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/ProductManager");
const productManager = new ProductManager("./src/models/products.json");

router.get("/products", async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);
    const response = await productManager.readFile();

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
  try {
    let id = req.params.id;
    const response = await productManager.readFile();
    const producto = response.find((item) => item.id == id);
    if (producto) {
      res.send(producto);
    } else {
      res.status(404).send({ error: "El producto no ha sido encontrado" });
    }
  } catch (error) {
    console.log(`error: ${error}`);
  }
});

router.post("/products", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnail } = req.body; 

    if (!title || !description || !code || !price || !stock || !category || !thumbnail) {
      console.log(req.body)
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const newProduct = {
      id: productManager.productsId++,
      title,
      description,
      code,
      price,
      stock,
      status: true,
      category,
      thumbnail: thumbnail || [],
    };

    await productManager.addProduct(newProduct);


    res.status(201).json({
      message: "Producto agregado correctamente",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/products/:pid", async (req, res) => {
  try {
    let id = req.params.pid;
    const product = await req.body;
    const allowedFields = [
      "title",
      "description",
      "code",
      "price",
      "stock",
      "category",
      "thumbnail",
    ];
    const invalidFields = Object.keys(product).filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res
        .status(400)
        .json({ error: `Campos no válidos: ${invalidFields.join(", ")}` });
    }
    await productManager.updateProduct(id, product);
    res.status(201).json({
      message: "Producto actualizado correctamente",
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/products/:pid", async (req, res) => {
  try {
    let id = req.params.pid;
    const deletedProduct = await productManager.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "El producto que desea borrar, no existe" });
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
