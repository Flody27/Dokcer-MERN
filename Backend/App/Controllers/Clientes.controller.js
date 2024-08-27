const Cliente = require("../Models/Usuario.model");
const sendEmail = require("../Helpers/sendEmail.js");
const { CompletarRegistro } = require("../utils/MailTemplate.js");
const fs = require("fs");
const path = require("path");

exports.crear = (req, res) => {
  const {
    Nombre,
    Apellidos,
    Telefono,
    CorreoElectronico,
    Contrasena,
    Direccion,
    DireccionAlt,
    Provincia,
    Ciudad,
    CodigoPostal,
    CodigoActivacion,
    estado,
  } = req.body;

  const cliente = new Cliente({
    Nombre,
    Apellidos,
    Telefono,
    CorreoElectronico,
    Contrasena,
    Direccion,
    DireccionAlt,
    Provincia,
    Ciudad,
    CodigoPostal,
    FotoPerfil: "picture.webp",
    rol: "Cliente",
    estado,
    google: false,
    CodigoActivacion,
  });

  cliente
    .save()
    .then(async (data) => {
      await sendEmail(
        CorreoElectronico,
        "Cuenta creada",
        CompletarRegistro(
          Nombre + " " + Apellidos,
          `${process.env.URL_TIENDA}TerminarRegistro/${data._id}`,
          CodigoActivacion
        )
      );
      res.send({ message: "Cliente agregado exitosamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss hubo un error agregando al cliente",
      });
    });
};

exports.buscarclientes = (req, res) => {
  Cliente.find({ rol: "Cliente" })
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener los clientes.",
      });
    });
};

exports.buscarcliente = (req, res) => {
  Cliente.findById(req.params.id)
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss. Tuvimos un error al obtener el cliente ",
      });
    });
};

exports.editar = (req, res) => {
  const {
    Nombre,
    Apellidos,
    Telefono,
    CorreoElectronico,
    Contrasena,
    Direccion,
    DireccionAlt,
    Provincia,
    Ciudad,
    CodigoPostal,
    FotoPerfil,
    estado,
    ElimiarFoto,
  } = req.body;

  if (ElimiarFoto != undefined) {
    let imgDir = path.join(__dirname, "../../Images", ElimiarFoto);
    fs.unlink(imgDir, () => {});
  }

  Cliente.findByIdAndUpdate(
    req.params.id,
    {
      Nombre,
      Apellidos,
      Telefono,
      CorreoElectronico,
      Contrasena,
      Direccion,
      DireccionAlt,
      Provincia,
      Ciudad,
      CodigoPostal,
      FotoPerfil,
      rol: "Cliente",
      estado,
      google: false,
    },
    { new: true }
  )
    .then(() => {
      res.send({ message: "Se actulizó correctamente el cliente" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss. Tuvimos un error al actualizar ",
      });
    });
};

exports.eliminar = (req, res) => {
  req.body.forEach((img) => {
    let imgDir = path.join(__dirname, "../../Images", img);
    fs.unlink(imgDir, () => {});
  });

  Cliente.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: "El cliente se eliminó correctamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al eliminar el cliente ",
      });
    });
};
