const express = require("express");
const app = express();
const logger = require("./middlewares/logger");
const joyasRoutes = require("./routes/joyasRoutes");

app.use(logger);
app.use(express.json());
app.use("/", joyasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
