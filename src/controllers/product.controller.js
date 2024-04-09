const ProductService = require("../services/product-service");
const productService = new ProductService();

class ProductController {
  async getProducts(req, res) {
    try {
      let { limit = 10, page = 1, sort, query } = req.query;
      console.log(limit);
      const response = await productService.getProducts(
        page,
        sort,
        limit,
        query
      );
      res.json(response);
    } catch (error) {
      console.log(`error: ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getProductsById(req, res) {
    const id = req.params.id;
    try {
      const response = await productService.getProductById(id);
      if (!response) {
        return res.json({
          error: "Producto no encontrado",
        });
      } else {
        return res.json(response);
      }
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(500).json({ error: "Error del servidor" });
    }
  }

  async createProduct(req, res) {
    const newProduct = req.body;
    try {
      await productService.addProduct(newProduct);

      res.status(201).json({
        message: "Producto agregado exitosamente",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateProduct(req, res) {
    let id = req.params.pid;
    const product = await req.body;
    try {
      await productService.updateProduct(id, product);
      res.json({
        message: "Producto actualizado exitosamente",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(req, res) {
    const id = req.params.pid;
    try {
      const deletedProduct = await productService.deleteProduct(id);

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
  }
}

module.exports = ProductController;
