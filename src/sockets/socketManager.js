const messageModel = require("../dao/models/message.model");
const socket = require("socket.io");
const ProductService = require("../services/product-service");
const productService = new ProductService();
const EmailManager = require("../utils/email")
const emailManager= new EmailManager()

class SocketManager {
  constructor(httpServer) {
    this.io = socket(httpServer);
    this.initSocketEvents();
  }
  async initSocketEvents() {
    this.io.on("connection", async (socket) => {
      socket.emit("products", await productService.getProducts());
      socket.on("deleteProducts", async (id, email, title) => {
        await productService.deleteProduct(id);
        this.emitUpdatedProducts(socket);
        console.log(id, email, title)
        await emailManager.sendMailDeleteProduct(email, title);

      });

      socket.on("addProduct", async (product) => {
        await productService.addProduct(product);
        this.emitUpdatedProducts(socket);
      });

      socket.on("message", async (data) => {
        await messageModel.create(data);
        const messages = await messageModel.find();
        socket.emit("message", messages);
      });

      
    });
  }

  

  async emitUpdatedProducts() {
    const products = await productService.getProducts();
    this.io.emit("products", products);
  }
}

module.exports = SocketManager;
