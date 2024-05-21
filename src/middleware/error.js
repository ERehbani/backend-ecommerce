const { EErrors } = require("../services/errors/enums.js");

const handleError = (error, req, res, next) => {
    console.log("ERROR EN HANDLEERROR",error)
   req.logger.info(error.causa);
    req.logger.error("Error en el middleware");
    switch (error.code) {
        case EErrors.TIPO_INVALIDO:
            res.send({ status: "error", error: error.nombre })
            break;
        default:
            res.send({ status: "error", error: "Error desconocido" })
    }
}

module.exports = handleError;