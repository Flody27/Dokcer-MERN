//const { check } = require("express-validator");

module.exports = (app) => {
  const empleados = require("../Controllers/Empleados.controller");

  app.post("/AgregarEmpleado", /*[ check('CorreoElectronico', 'El Correo es obligatorio').isEmail()],*/ empleados.crear);

  app.get("/BuscarEmpleados", empleados.buscarempleados);

  app.get("/BuscarEmpleado/:id", empleados.buscarempleado);

  app.put("/EditarEmpleado/:id", empleados.editar);

  app.delete("/EliminarEmpleado/:id", empleados.eliminar);
  
  
};
