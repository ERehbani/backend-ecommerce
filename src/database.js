// Conexión con MongoDB
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGOOSE_CONNECT)
.then(() => console.log("MongoDB ✅"))
.catch(() => console.log("Conexión MALARDA"))