const CategoriaMod = require("../Models/Categoria.model");
const ProductoM = require("../Models/ProductoModel");

exports.crear = (req, res) => {
  const { Categoria } = req.body;

  const categoria = new CategoriaMod({ Categoria });

  categoria
    .save()
    .then(() => {
      res.send({ message: "Categoria agregado exitosamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss hubo un error agregando la categoria",
      });
    });
};

exports.buscarCategorias = (req, res) => {
  CategoriaMod.find()
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Opss. Tuvimos un error al obtener las categorias de productos",
      });
    });
};

exports.editar = (req, res) => {
  const { Categoria } = req.body;

  CategoriaMod.findByIdAndUpdate(
    req.params.id,
    {
      Categoria,
    },
    { new: true }
  )
    .then(() => {
      res.send({ message: "Se actulizo correctamente la categoria" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al actualizar la categoria",
      });
    });
};

exports.eliminar = (req, res) => {
  CategoriaMod.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: "La categoria se elimino correctamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al eliminar la categoria",
      });
    });
};

exports.CategoriasEnUso = (req, res) => {
  // const pipeline = [
  //   {
  //     $lookup: {
  //       from: "productos",
  //       localField: "Categoria",
  //       foreignField: "Categoria",
  //       as: "CategoriaEnUso",
  //     },
  //   },
  //   {
  //     $match: {
  //       CategoriaEnUso: {
  //         $ne: [],
  //       },
  //     },
  //   },
  //   {
  //     $project: {
  //       CategoriaEnUso: 0,
  //       createdAt: 0,
  //       updatedAt: 0,
  //       __v: 0,
  //     },
  //   },
  // ];

  const pipeline = [
    {
      $match: {
        Cantidad: {
          $gt: 0,
        },
      },
    },
    {
      $project: {
        Categoria: 1,
      },
    },
    {
      $group: {
        _id: "$Categoria",
        Categoria: {
          $first: "$Categoria",
        },
      },
    },
    {
      $project: {
        _id: 0,
        Categoria: 1,
      },
    },
  ];

  ProductoM.aggregate(pipeline)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener las categorias",
      });
    });
};
