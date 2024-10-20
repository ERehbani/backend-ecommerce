const express = require("express");
const http = require("node:http");
const productsRouter = require("./routes/products.router");
const SocketManager = require("./sockets/socketManager");
const cartRouter = require("./routes/cart.router");
const userRouter = require("./routes/user.router");
const sessionRouter = require("./routes/sessions.router");
const viewsRouter = require("./routes/views.router");
const exphbs = require("express-handlebars");
const socketIO = require("socket.io");
const cors = require("cors");
const MessageModel = require("./dao/models/message.model");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const initializePassport = require("./config/passport.config");
const handleError = require("./middleware/error.js");
const addLogger = require("./utils/logger.js");
const path = require("node:path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");
const multer = require("multer");
const upload = require("./middleware/multer.js");

require("./database");

const hbs = exphbs.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

app.use("/public", express.static("public"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "secret",
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
app.use(addLogger);

app.use(cookieParser("secret"));
app.engine("hbs", exphbs.engine());
app.use("/", viewsRouter(io));
app.use("/realtimeproducts", viewsRouter(io));
app.use("/products", viewsRouter(io));
app.use("/carts", viewsRouter(io));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use("/api", productsRouter);
app.use("/api", cartRouter);
app.use("/api", userRouter);
app.use("/api", sessionRouter);

app.use(handleError);

httpServer.listen(8080, () => {
  console.log("8080 🌎");
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentation Ecommerce",
      description:
        "App dedicada a la integracion de un ecomerce",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};
const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

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

new SocketManager(httpServer);
