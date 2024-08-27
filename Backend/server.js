const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");
const {
  Recordatorio,
} = require("./App/Controllers/PagosPendientes.controller.js");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("Images"));

//Iniciar el servidor
app.listen("8000", () => {
  console.log("Server iniciado en el puerto 8000");
});

// Conexion con la base datos
mongoose
  .connect(config.url)
  .then(() => {
    console.log("Se conecto exitosamente con la base de datos");
  })
  .catch((error) => {
    console.error(`Surguio un error ${error}`);
  });

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "_" +
        Date.now() +
        file.originalname +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("images"), (req, res) => {
  let fileNames = req.files.map((file) => file.filename);
  res.json(fileNames);
});

require("./App/Routes/Autenticacion.routes")(app);
require("./App/Routes/PagosPendientes.routes")(app);
require("./App/Routes/Empleados.routes")(app);
require("./App/Routes/Clientes.routes")(app);
require("./App/Routes/ProductoRoutes")(app);
require("./App/Routes/Categoria.routes")(app);
require("./App/Routes/Comentario.routes")(app);
require("./App/Routes/PedidoRoutes")(app);
cron.schedule("0 16 * * *", () => {
  Recordatorio();
});
