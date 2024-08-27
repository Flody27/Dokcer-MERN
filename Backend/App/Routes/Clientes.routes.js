//const { check } = require("express-validator");

module.exports = (app) => {
  const clientes = require("../Controllers/Clientes.controller");

  app.post("/AgregarCliente", /*[ check('CorreoElectronico', 'El Correo es obligatorio').isEmail()],*/ clientes.crear);

  app.get("/BuscarClientes", clientes.buscarclientes);

  app.get("/BuscarCliente/:id", clientes.buscarcliente);

  app.put("/EditarCliente/:id", clientes.editar);

  app.delete("/EliminarCliente/:id", clientes.eliminar);
  
  
};
