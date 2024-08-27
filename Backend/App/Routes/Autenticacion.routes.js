const { check } = require("express-validator");
const { validarCampos } = require("../Middleware/validar_campos.js");

module.exports = (app) => {
  const autenticacion = require("../Controllers/Autenticacion.controller.js");
  //Estas son las rutas para el API

  app.post(
    "/Registrarse",
    [
      check("CorreoElectronico", "Formato de correo incorrecto").isEmail(),
      check("Contrasena", "Contraseña debil").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
      validarCampos,
    ],
    autenticacion.Registrarse
  );

  // app.post("/Registrarse", autenticacion.Registrarse);

  app.post(
    "/IniciarSesion",
    [
      check("CorreoElectronico", "El Correo es obligatorio").isEmail(),
      check("Contrasena", "La Contraseña es obligatoria").not().isEmpty(),
      validarCampos,
    ],
    autenticacion.IniciarSesion
  );

  app.post("/ConfirmarCuenta/:id", autenticacion.ConfirmarCuenta);

  app.post("/SolicitarCambio", autenticacion.SolicitudCambio);

  app.post("/RestablecerCredenciales", autenticacion.RestablecerCredenciales);

  app.post("/TerminarRegistro", autenticacion.TerminarRegistro);
};
