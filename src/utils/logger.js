const winston = require("winston");
const { NODE_ENV } = require("process");

const niveles = {
  nivel: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colores: {
    fatal: "red",
    error: "yellow",
    warning: "blue",
    info: "green",
    http: "magenta",
    debug: "white",
  },
};

const devLogger = winston.createLogger({
  levels: niveles.nivel,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: niveles.colores }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errores.log",
      level: "warning",
      format: winston.format.simple(),
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: niveles.nivel,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: niveles.colores }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errores.log",
      level: "warning",
      format: winston.format.simple(),
    }),
  ],
});

//middleware:
const logger = NODE_ENV === "dev" ? devLogger : prodLogger;

const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`
  );
  next();
};

module.exports = addLogger;
