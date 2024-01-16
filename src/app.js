const express = require("express");
const http = require("http");
const ProductManager = require("./controllers/ProductManager");
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router");
const viewsRouter = require("./routes/views.router");
const exphbs = require("express-handlebars");
const socketIO = require("socket.io");



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


