const { check } = require("express-validator");
const { validarCampos } = require("../Middleware/validar_campos.js");

module.exports = (app) => {
  const producto = require("../Controllers/ProductosController.js");

  app.get("/Productos/ObtenerProductos", producto.obtenerProductos);

  app.get("/Productos/ObtenerProducto/:id", producto.obtenerProducto);

  app.post("/Productos/CrearProducto", producto.crearProducto);

  app.put("/Productos/ActualizarProducto/:id", producto.actualizarProducto);

  app.delete("/Productos/EliminarProducto/:id", producto.eliminarProducto);
};
