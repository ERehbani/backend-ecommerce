const fs = require("fs").promises;

class ProductManager {
  constructor(path) {
    this.products = [];
    this.productsId = 0;
    this.path = path;

    this.loadProducts();
  }

  async loadProducts() {
    try {
      const arrayProducts = await this.readFile();
      this.products = arrayProducts;
      if (this.products.length > 0) {
        // Find the maximum id to continue incrementing
        this.productsId = Math.max(
          ...this.products.map((product) => product.id)
        );
      }
    } catch (error) {
      console.log("Error loading products", error);
    }
  }

  async addProduct(product) {
    try {
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      const arrayProducts = await this.readFile();

      const codeExist = arrayProducts.some(
        (item) => item.code === product.code
      );

      if (codeExist) {
        console.log(`El código ingresado ya existe`);
        return;
      }

      this.products.push(product);
      product.id = this.productsId++;

      await this.saveFile([...arrayProducts, product]);
    } catch (error) {
      console.log("Error al agregar el producto");
    }
  }

  getProducts() {
    return this.products;
  }

  async getProductById(id) {
    try {
      const arrayProducts = await this.readFile();
      const finded = arrayProducts.find((item) => item.id === id);

      if (!finded) console.log("Producto no encontrado");

      console.log("El producto fue encontrado correctamente");
      return finded;
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  async readFile() {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(response);
      return data;
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  async saveFile(array) {
    try {
      await fs.writeFile(this.path, JSON.stringify(array, null, 2));
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const arrayProducts = await this.readFile();
  
      const index = arrayProducts.findIndex(
        (item) => Number(item.id) === Number(id)
      );
  
      if (index >= 0) {
        arrayProducts[index] = { ...arrayProducts[index], ...updatedProduct };
        await this.saveFile(arrayProducts);
        console.log("Producto actualizado correctamente");
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }
  

  async deleteProduct(id) {
    try {
      const arrayProducts = await this.readFile();
      const index = arrayProducts.findIndex((item) => item.id === Number(id));
  
      if (index !== -1) {
        const deletedProduct = arrayProducts.splice(index, 1)[0];
        await this.saveFile(arrayProducts);
        console.log(`El producto con ID ${id} fue eliminado correctamente`);
        return deletedProduct;
      } else {
        console.log(`Producto con ID ${id} no encontrado`);
        return null;
      }
    } catch (error) {
      console.log("Error al eliminar el producto", error);
      return null;
    }
  }
  
  
  
}

// const manager = new ProductManager("./src/products.json");

module.exports = ProductManager;
