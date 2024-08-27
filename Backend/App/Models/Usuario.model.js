const mongoose = require("mongoose");
const UsuarioSchema = mongoose.Schema(
  {
    Nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    Apellidos: {
      type: String,
      required: [true, "El apellido es obligatorio"],
    },
    CorreoElectronico: {
      type: String,
      required: [true, "El correo electronico es obligatorio"],
      unique: true,
    },
    Telefono: Number,
    Contrasena: {
      type: String,
      unique: false,
    },
    Cedula: Number,

    // Datos para empleados
    Puesto: String,
    Sueldo: Number,

    //Datos para clientes
    // Pais: String,

    Direccion: String,
    DireccionAlt: String,
    Provincia: String,
    Ciudad: String,
    CodigoPostal: String,

    CodigoActivacion: String,

    rol: {
      type: String,
      required: true,
      default: "Cliente",
    },
    estado: {
      type: Boolean,
      default: false,
    },
    google: {
      type: Boolean,
      default: false,
    },
    FotoPerfil: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Usuarios", UsuarioSchema);
