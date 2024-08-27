module.exports = (app) => {
  const categoria = require("../Controllers/Categorias.controller");

  app.post("/AgregarCategoria", categoria.crear);

  app.get("/Categorias", categoria.buscarCategorias);

  app.get("/BuscarCategorias", categoria.CategoriasEnUso);

  app.put("/EditarCategoria/:id", categoria.editar);

  app.delete("/EliminarCategoria/:id", categoria.eliminar);
};
