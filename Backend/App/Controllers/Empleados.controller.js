const Empleado = require("../Models/Usuario.model");
const sendEmail = require("../Helpers/sendEmail.js");
const { CompletarRegistro } = require("../utils/MailTemplate.js");

exports.crear = (req, res) => {
  const {
    Nombre,
    Apellidos,
    Cedula,
    Telefono,
    CorreoElectronico,
    Contrasena,
    Puesto,
    Sueldo,
    CodigoActivacion,
    estado,
  } = req.body;

  const empleado = new Empleado({
    Nombre,
    Apellidos,
    Cedula,
    Telefono,
    CorreoElectronico,
    Contrasena,
    Puesto,
    Sueldo,
    rol: "Empleado",
    estado,
    CodigoActivacion,
  });

  empleado
    .save()
    .then(async (data) => {
      await sendEmail(
        CorreoElectronico,
        "Cuenta creada",
        CompletarRegistro(
          Nombre + " " + Apellidos,
          `${process.env.URL_ADMIN}TerminarRegistro/${data._id}`,
          CodigoActivacion
        )
      );
      res.send({ message: "Empleado agregado exitosamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss hubo un error agregando al empleado",
      });
    });
};

exports.buscarempleados = (req, res) => {
  Empleado.find({ rol: "Empleado" })
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener los empleados.",
      });
    });
};

exports.buscarempleado = (req, res) => {
  Empleado.findById(req.params.id)
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener el empleado ",
      });
    });
};

exports.editar = (req, res) => {
  const {
    Nombre,
    Apellidos,
    Cedula,
    Telefono,
    CorreoElectronico,
    Contrasena,
    Puesto,
    Sueldo,
    estado,
  } = req.body;

  Empleado.findByIdAndUpdate(
    req.params.id,
    {
      Nombre,
      Apellidos,
      Cedula,
      Telefono,
      CorreoElectronico,
      Contrasena,
      Puesto,
      Sueldo,
      rol: "Empleado",
      estado,
    },
    { new: true }
  )
    .then(() => {
      res.send({ message: "Se actulizó correctamente el empleado" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss. Tuvimos un error al actualizar ",
      });
    });
};

exports.eliminar = (req, res) => {
  Empleado.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: "El empleado se eliminó correctamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al eliminar el empleado ",
      });
    });
};

exports.eliminar = (req, res) => {
  Empleado.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: "El empleado se eliminó correctamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al eliminar el empleado ",
      });
    });
};
