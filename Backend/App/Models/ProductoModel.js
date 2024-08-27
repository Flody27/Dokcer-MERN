const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema(
  {
    Nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
    },
    Precio: {
      type: Number,
      required: [true, "El campo precio es obligatorio"],
    },
    Cantidad: {
      type: Number,
      required: [true, "El campo cantidad es obligatoria"],
    },
    Descripcion: {
      type: String,
      required: [true, "El campo descripción es obligatorio"],
    },
    Imagen: [],
    Categoria: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Productos", ProductoSchema);
