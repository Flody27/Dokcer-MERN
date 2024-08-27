const ProductoM = require("../Models/ProductoModel");
const fs = require("fs");
const path = require("path");

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await ProductoM.find({});

    return res.status(200).json({
      productos,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Ha ocurrido un error con el servidor",
      productos: [],
    });
  }
};

exports.obtenerProducto = async (req, res) => {
  const { id } = req.params;

  if (id == null || id == undefined) {
    return res.status(204).send({
      message: "Debe colocar el parametro del producto",
    });
  }

  try {
    const producto = await ProductoM.findById(id);

    if (producto == null || producto == undefined) {
      return res.status(400).send({
        message: "El producto a buscar es invalido o no existe",
      });
    }

    return res.status(200).json({
      producto,
    });
  } catch (error) {
    return res.status(400).json({
      message: "El producto a buscar es invalido o no existe",
    });
  }
};

exports.crearProducto = async (req, res) => {
  const { Nombre, Precio, Cantidad, Descripcion, Imagen, Categoria } = req.body;

  const producto = new ProductoM({
    Nombre,
    Precio,
    Cantidad,
    Descripcion,
    Imagen,
    Categoria,
  });

  try {
    await producto
      .save()
      .then((data) => res.send(data))
      .catch((err) => {
        res.status(400).send({
          message: "Ha ocurrido un error en el servidor al crear el producto",
        });
      });
  } catch (error) {
    return res.status(400).send({
      message: "Ha ocurrido un error con el producto",
    });
  }
};

exports.actualizarProducto = async (req, res) => {
  const {
    Nombre,
    Precio,
    Cantidad,
    Descripcion,
    Imagen,
    Categoria,
    eliminarImagenes,
  } = req.body;

  const { id } = req.params;

  if (id == null || id == undefined) {
    return res.status(204).send({
      message: "Debe colocar el parametro del producto",
    });
  }

  try {
    const productoEncontrado = await ProductoM.findById(id);

    if (
      productoEncontrado == null ||
      productoEncontrado == undefined ||
      productoEncontrado == []
    ) {
      return res.status(400).send({
        message: "El producto a actualizar es invalido o no existe",
      });
    }

    if (eliminarImagenes.length > 0) {
      eliminarImagenes.forEach((img) => {
        let imgDir = path.join(__dirname, "../../Images", img);
        fs.unlink(imgDir, () => {});
      });
    }

    await ProductoM.findByIdAndUpdate(id, {
      Nombre,
      Precio,
      Cantidad,
      Descripcion,
      Imagen,
      Categoria,
    });

    return res.status(200).send({
      message: `El producto con id '${id}' ha sido actualizado correctamente`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "El producto a actualizar es invalido o no existe",
    });
  }
};

exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;

  if (id == null || id == undefined) {
    return res.status(204).send({
      message: "Debe colocar el parametro del producto",
    });
  }

  try {
    const productoEncontrado = await ProductoM.findById(id);

    if (
      productoEncontrado == null ||
      productoEncontrado == undefined ||
      productoEncontrado == []
    ) {
      return res.status(400).send({
        message: "El producto a eliminar es invalido o no existe",
      });
    }

    req.body.forEach((img) => {
      let imgDir = path.join(__dirname, "../../Images", img);
      fs.unlink(imgDir, () => {});
    });

    await ProductoM.findByIdAndDelete(id);

    return res.status(200).send({
      message: `El producto con id '${id}' ha sido eliminado correctamente`,
    });
  } catch (error) {
    return res.status(400).send({
      message: "El producto a eliminar es invalido o no existe",
    });
  }
};
