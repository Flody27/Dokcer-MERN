const mongoose = require("mongoose");
const PagoPendiente = mongoose.Schema(
  {
    Entidad: {
      type: String,
      required: [true, "El nombre de la entidad es obligatorio"],
    },
    Monto: {
      type: Number,
      required: [true, "El monto a pagar es obligatorio"],
    },
    FechaLimite: {
      type: Date  ,
      required: [true, "La fecha limite es obligatorio"],
    },
    Estado: {
      type: String,
      required: [true, "El estado del pago es obligatorio"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PagosPendientes", PagoPendiente);
