const mongoose = require("mongoose");

const PedidoSchema = mongoose.Schema(
  {
    Usuario: {
      type: String,
      required: [true, "El usuario a realizar el pedido es obligatorio"],
    },
    Identificacion: {
      type: String,
      required: [
        true,
        "La idenficacion del usuario a realizar el pedido es obligatorio",
      ],
    },
    Productos: [
      {
        id: {
          type: String,
          required: [true, "El id del producto es obligatorio"],
        },
        nombre: {
          type: String,
          required: [true, "El id del producto es obligatorio"],
        },
        imagen: {
          type: String,
          required: [true, "La imagen del producto es obligatoria"],
        },
        precio: {
          type: Number,
          required: [true, "El precio del producto es obligatorio"],
        },
        cantidad: {
          type: Number,
          required: [true, "La cantidad del producto es obligatoria"],
        },
      },
    ],
    MedioPago: {
      type: String,
      enum: ["Sinpe", "Tarjeta"],
      required: false,
      default: "Sinpe",
    },
    NumeroFactura: {
      type: String,
      required: false,
    },
    Estado: {
      type: String,
      enum: ["En Proceso", "Enviando", "Finalizado", "Cancelado", "Pendiente"],
      default: "En Proceso",
      required: false,
    },
    CostoTotal: {
      type: Number,
      required: [true, "El costo a pagar es obligatorio"],
    },
    Contacto: {
      nombre: {
        type: String,
        required: [true, "La nombre del pedido es obligatorio"],
      },
      apellidos: {
        type: String,
        required: [true, "Los apellidos del pedido son obligatorios"],
      },
      telefono: {
        type: Number,
        required: [true, "El numero de telefono es obligatorio"],
      },
      correo: {
        type: String,
        required: [true, "El correo electronico es obligatorio"],
      },
      direccion1: {
        type: String,
        required: [true, "La direccion1 del pedido es obligatoria"],
      },
      direccionAlt: { type: String, required: false, default: "" },
      ciudad: {
        type: String,
        required: [true, "La ciudad del pedido es obligatoria"],
      },
      provincia: {
        type: String,
        required: [true, "La provincia del pedido es obligatoria"],
      },
      codigo: {
        type: String,
        required: [true, "El codigo postal del pedido es obligatorio"],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pedidos", PedidoSchema);
