const logger = (req, res, next) => {
  console.log(`Consulta a la ruta: ${req.method} ${req.url}`);
  next();
};

module.exports = logger;