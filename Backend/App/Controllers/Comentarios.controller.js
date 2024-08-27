const ComentarioMod = require("../Models/Comentario.model");
const mongoose = require("mongoose");

exports.crear = (req, res) => {
  const { Comentario, ProductoId, UsuarioId } = req.body;

  let fecha = new Date();

  const comentario = new ComentarioMod({
    Comentario,
    ProductoId,
    UsuarioId,
    Fecha: fecha,
  });

  comentario
    .save()
    .then(() => {
      res.send({ message: "Comentario agregado exitosamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss hubo un error agregando el comentario",
      });
    });
};

exports.buscarComentarios = (req, res) => {
  ComentarioMod.find()
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Opss. Tuvimos un error al obtener los comentarios del productos",
      });
    });
};

exports.editar = (req, res) => {
  const { Comentario, ProductoId, UsuarioId } = req.body;
  let fecha = new Date();
  ComentarioMod.findByIdAndUpdate(
    req.params.id,
    {
      Comentario,
      ProductoId,
      UsuarioId,
      Fecha: fecha,
    },
    { new: true }
  )
    .then(() => {
      res.send({ message: "Se actulizo correctamente el comentario" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al actualizar el comentario",
      });
    });
};

exports.eliminar = (req, res) => {
  ComentarioMod.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: "El comentario se elimino correctamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al eliminar el comentario",
      });
    });
};

exports.ComentariosProductos = (req, res) => {
  // const pipeline = [
  //   [
  //     {
  //       $match: {
  //         ProductoId: req.params.id,
  //       },
  //     },
  //     {
  //       $sort: {
  //         Fecha: -1,
  //       },
  //     },
  //   ],
  // ];

  const pipeline = [
    {
      $match: {
        ProductoId: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "usuarios",
        localField: "UsuarioId",
        foreignField: "_id",
        as: "usuario",
      },
    },
    {
      $project: {
        usuario: {
          _id: 0,
          CorreoElectronico: 0,
          Contrasena: 0,
          rol: 0,
          estado: 0,
          google: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          CodigoPostal: 0,
          Direccion: 0,
          Pais: 0,
          Telefono: 0,
        },
      },
    },
    {
      $sort: {
        Fecha: -1,
      },
    },
  ];

  ComentarioMod.aggregate(pipeline)
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Opss. Tuvimos un error al obtener los comentarios del producto",
      });
    });
};
