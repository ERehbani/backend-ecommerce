// Conexión con MongoDB

const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://weon:1234@cluster0.bny70nj.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(() => console.log("Conexion existosa"))
.catch(() => console.log("Conexión MALARDA"))