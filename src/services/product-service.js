const ProductModel = require("../dao/models/product.model");

class ProductService {
  async addProduct({
    title,
    description,
    price,
    img,
    code,
    stock,
    category,
    thumbnails,
  }) {
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      const existProduct = await ProductModel.findOne({ code: code });
      if (existProduct) {
        console.log("El codigo debe ser unico");
        return;
      }

      const newProduct = new ProductModel({
        title,
        description,
        code,
        price,
        stock,
        status: true,
        category,
        thumbnails: thumbnails || [],
      });
      console.log(newProduct)
      await newProduct.save();
    } catch (error) {
      console.log("Error al agregar producto");
      throw error;
    }
  }

  async getProducts(page, sort = "asc", limit, query) {

    try {
      const skip = (page - 1) * limit;
      let queryOptions = {};
      if (query) queryOptions = { category: query };
      const sortOptions = {};
      sortOptions.price = sort === "asc" ? 1 : sort === "des" ? -1 : 1;
      const products = await ProductModel.find(queryOptions)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      const totalProducts = await ProductModel.countDocuments(queryOptions);

      const totalPages = Math.ceil(totalProducts / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      
      return {
        status: "success",
        docs: products,
        totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? parseInt(page) + 1 : null,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage
          ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}`
          : null,
        nextLink: hasNextPage
          ? `/api/products?limit=${limit}&page=${parseInt(page) + 1}&sort=${sort}`
          : null,
      };
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }

  async getProductById(id) {
    try {
      const producto = await ProductModel.findById(id);

      if (!producto) {
        console.log("Producto no encontrado");
        return null;
      }
      return producto;
    } catch (error) {
      console.log(error, "Error al traer por id");
    }
  }

  async updateProduct(id, productUpdate) {
    try {
      const productActualizado = await ProductModel.findByIdAndUpdate(
        id,
        productUpdate
      );

      if (!productActualizado) {
        console.log("No se encuentra el producto amigwi");
        return null;
      }

      return productActualizado;
    } catch (error) {
      console.log("El producto no se pudo actualizar rey", error);
    }
  }

  async deleteProduct(id) {
    try {
      const deleteadito = await ProductModel.findByIdAndDelete(id);
      if (!deleteadito) {
        console.log("A ver si buscamos mejor");
        return null;
      }

      console.log("Borrado correctamente");
      return deleteadito;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductService;
