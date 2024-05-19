const ProductService = require("../services/product-service");
const CustomError = require("../services/errors/custom-error");
const productService = new ProductService();
const {
  generateErrorAddProduct,
  generateErrorGetProduct,
  generateErrorUpdate,
  generateErrorDelete,
  generateErrorGetId,
} = require("../services/errors/info");
const { EErrors } = require("../services/errors/enums");

class ProductController {
  async getProducts(req, res) {
    try {
      let { limit = 10, page = 1, sort, query } = req.query;
     req.logger.info(limit);
      const response = await productService.getProducts(
        page,
        sort,
        limit,
        query
      );
      res.json(response);
    } catch (error) {
      CustomError.crearError({
        nombre: "Usuario nuevo",
        causa: generateErrorGetProduct(req.query),
        mensaje: "Error al intentar traer producto/s",
        codigo: EErrors.TIPO_INVALIDO,
      });
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
      CustomError.crearError({
        nombre: "Traer producto por id",
        causa: generateErrorGetId(id),
        mensaje: "Error al intentar traer producto por id",
        codigo: EErrors.TIPO_INVALIDO,
      });
      return res.status(500).json({ error: "Error del servidor" });
    }
  }

  async createProduct(req, res) {
    const newProduct = req.body;
    try {
      const product = await productService.addProduct(newProduct);

      res.status(201).json({
        message: "Producto agregado exitosamente",
        payload: product,
      });
    } catch (error) {
      CustomError.crearError({
        nombre: "Crear producto",
        causa: generateErrorAddProduct(newProduct),
        mensaje: "Error al crear un producto",
        codigo: EErrors.TIPO_INVALIDO,
      });
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
      CustomError.crearError({
        nombre: "Actualizar producto",
        causa: generateErrorUpdate(id, product),
        mensaje: "Error al actualizar el producto",
        codigo: EErrors.TIPO_INVALIDO,
      });
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
      CustomError.crearError({
        nombre: "Eliminar producto",
        causa: generateErrorDelete(id),
        mensaje: "Error al eliminar el producto",
        codigo: EErrors.TIPO_INVALIDO,
      });
      res.status(500).send({ error: "Error interno del servidor" });
    }
  }
}

module.exports = ProductController;
