const express = require("express");
const http = require("http");
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router");
const userRouter = require("./routes/user.router");
const sessionRouter = require("./routes/sessions.router");
const viewsRouter = require("./routes/views.router");
const exphbs = require("express-handlebars");
const socketIO = require("socket.io");
const MessageModel = require("./dao/models/message.model");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const initializePassport = require("./config/passport.config");
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
app.use(
  session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://weon:1234@cluster0.bny70nj.mongodb.net/ecommerce?retryWrites=true&w=majority",
      ttl: 100,
    }),
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.engine("hbs", exphbs.engine());
app.set("view engine", "hbs");
app.set("views", "./src/views");
app.use("/", viewsRouter(io));
app.use("/realtimeproducts", viewsRouter(io));
app.use("/products", viewsRouter(io));
app.use("/carts", viewsRouter(io));

app.use("/api", productsRouter);
app.use("/api", cartRouter);
app.use("/api", userRouter);
app.use("/api", sessionRouter);

httpServer.listen(8080, () => {
  console.log("8080 🌎");
});

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");
  socket.on("message", async (data) => {
    // Guardo los mensajes en MongoDB
    await MessageModel.create(data);

    // Obtengo los mensajes de MongoDB y se los paso al cliente
    const messages = await MessageModel.find();
    socket.emit("message", messages);
  });
});
