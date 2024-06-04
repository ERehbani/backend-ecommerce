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
      const { limit = 10, page = 1, sort, query } = req.query;
      req.logger.info(limit);
      const response = await productService.getProducts(
        page,
        sort,
        limit,
        query
      );
      if (!response) {
        CustomError.crearError({
          nombre: "Usuario nuevo",
          causa: generateErrorGetProduct(req.query),
          mensaje: "Error al intentar traer producto/s",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getProductsById(req, res) {
    const id = req.params.id;
    try {
      const response = await productService.getProductById(id);
      if (!response) {
        CustomError.crearError({
          nombre: "Traer producto por id",
          causa: generateErrorGetId(id),
          mensaje: "Error al intentar traer producto por id",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: "Error del servidor" });
    }
  }

  async createProduct(req, res) {
    const newProduct = req.body;
    console.log("NEW PRODUCT IN CONTROLLER", newProduct);
    try {
      const product = await productService.addProduct(newProduct);
      if (!product) {
        CustomError.crearError({
          nombre: "Crear producto",
          causa: generateErrorAddProduct(newProduct.title),
          mensaje: "Error al crear un producto",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      
      return res.status(302).redirect("back");
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(req, res) {
    const id = req.params.pid;
    const product = await req.body;
    try {
      const updatedCart = await productService.updateProduct(id, product);
      if (!updatedCart) {
        CustomError.crearError({
          nombre: "Actualizar producto",
          causa: generateErrorUpdate(id, product),
          mensaje: "Error al actualizar el producto",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      res.json({
        message: "Producto actualizado exitosamente",
      });
    } catch (error) {
      req.logger.error(error);
    }
  }

  async deleteProduct(req, res) {
    const id = req.params.pid;
    try {
      const deletedProduct = await productService.deleteProduct(id);

      if (!deletedProduct) {
        CustomError.crearError({
          nombre: "Eliminar producto",
          causa: generateErrorDelete(id),
          mensaje: "El producto que desea borrar, no existe",
          codigo: EErrors.TIPO_INVALIDO,
        });
      }
      res.status(200).send({
        message: "Producto eliminado correctamente",
        deletedProduct: deletedProduct,
      });
    } catch (error) {
      req.logger.error(error);
      return res.status(500).send({ error: "Error interno del servidor" });
    }
  }

  async deleteProductByCode(req, res) {
    const code = req.params.code
    try {
      const result = await UserModel.findOneAndDelete({code})
      if(!result) {
        return res.status(404).send({ error: "Producto no encontrado" });
      }
      res.status(200).send({ message: "Producto eliminado con éxito" });
    } catch (error) {
      res.status(500).send({ error: "Error interno del servidor" });
    }
  }
}

module.exports = ProductController;
