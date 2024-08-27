module.exports = (app) => {
  const pagosPendientes = require("../Controllers/PagosPendientes.controller");

  app.post("/AgregarPagoPendiente", pagosPendientes.crear);

  app.get("/PagosPendientes", pagosPendientes.buscarPagos);

  app.get("/ProximosPagos", pagosPendientes.ProximosPagos);

  app.get("/PagoPendiente/:id", pagosPendientes.buscarPago);

  app.put("/EditarPagoPendiente/:id", pagosPendientes.editar);

  app.delete("/EliminarPagoPendiente/:id", pagosPendientes.eliminar);
};
