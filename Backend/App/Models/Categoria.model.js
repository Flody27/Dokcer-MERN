const mongoose = require("mongoose");

const CategoriaProducto = mongoose.Schema(
  {
    Categoria: {
      type: String,
      required: [true, "Ingrese una categoria"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("categorias_productos", CategoriaProducto);
