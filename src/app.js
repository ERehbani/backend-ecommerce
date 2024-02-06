const express = require("express");
const http = require("http");
const ProductManager = require("./dao/fs/ProductManager");
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router");
const viewsRouter = require("./routes/views.router");
const exphbs = require("express-handlebars");
const socketIO = require("socket.io");
const MessageModel = require("./dao/models/message.model");
require("./database");

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

app.use("/public", express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use("/", viewsRouter(io));
app.use("/realtimeproducts", viewsRouter(io));

app.use("/api", productsRouter);
app.use("/api", cartRouter);

httpServer.listen(8080, () => {
  console.log("Funcando en el puerto 8080");
});


io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");
  socket.on("message", async (data) => {

    // Guardo los mensajes en MongoDB
    await MessageModel.create(data);

    // Obtengo los mensajes de MongoDB y se los paso al cliente
    const messages = await MessageModel.find()
    socket.emit("message", messages)

  });
});
