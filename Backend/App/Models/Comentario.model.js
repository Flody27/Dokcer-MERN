const mongoose = require("mongoose");

const ComentarioProducto = mongoose.Schema(
  {
    Comentario: {
      type: String,
      required: [true, "Ingrese un comentario"],
    },
    ProductoId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    UsuarioId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    Fecha: {
      type: Date,
      required: false,
    },
    // Puntuacion: {
    //   type: Number,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comentarios_productos", ComentarioProducto);
