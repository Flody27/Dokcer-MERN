const { check } = require("express-validator");
const { validarCampos } = require("../Middleware/validar_campos.js");

module.exports = (app) => {
  const pedido = require("../Controllers/PedidosController.js");

  app.get(
    "/Pedidos/ObtenerPedidosPorUsuario/:user",
    pedido.obtenerPedidosPorUsuario
  );

  app.get("/Pedidos/ObtenerPedido/:id", pedido.obtenerPedidoPorId);

  app.get("/Pedidos/ObtenerPedidos", pedido.obtenerPedidos);

  app.post(
    "/Pedidos/registrarPedidoSinpe",
    [
      check("Usuario", "El id del usuario es requerido")
        .not()
        .isEmpty()
        .isString()
        .isMongoId(),
      check("NumeroFactura", "El numero de la factura es requerido")
        .not()
        .isEmpty()
        .isString(),
      check("Identificacion", "La identificacion del usuario es requerida")
        .not()
        .isEmpty()
        .trim()
        .isString(),
      check("Productos", "Los productos son requeridos")
        .not()
        .isEmpty()
        .isArray(),
      check("Contacto.nombre", "El nombre del contacto es requerido")
        .not()
        .isEmpty()
        .trim(),
      check("Contacto.apellidos", "Los apellidos del contacto son requeridos")
        .not()
        .isEmpty()
        .trim(),
      check("Contacto.telefono", "El telefono es obligatorio")
        .not()
        .isEmpty()
        .trim()
        .isInt(),
      check("Contacto.correo", "El correo electronico es obligatorio")
        .not()
        .isEmpty()
        .trim()
        .isEmail(),
      check("Contacto.direccion1", "La direccion #1 del contacto es requerida")
        .not()
        .isEmpty()
        .trim(),
      check("Contacto.ciudad", "La ciudad del contacto es requerida")
        .not()
        .isEmpty()
        .trim(),
      check("Contacto.provincia", "La provincia del contacto es requerida")
        .not()
        .isEmpty()
        .trim(),
      check("Contacto.codigo", "El codigo postal es requerido")
        .not()
        .isEmpty()
        .trim(),
      validarCampos,
    ],
    pedido.registrarPedidoSinpe
  );

  app.put(
    "/Pedidos/ActualizarPedido/:id",
    [
      check("Usuario", "El id del usuario es requerido")
        .not()
        .isEmpty()
        .isString()
        .isMongoId(),
      check("NumeroFactura", "El numero de la factura es requerido")
        .not()
        .isEmpty()
        .isString(),
      check("Identificacion", "La identificacion del usuario es requerida")
        .not()
        .isEmpty()
        .trim()
        .isString(),
      check("Productos", "Los productos son requeridos")
        .not()
        .isEmpty()
        .isArray(),
      check("Contacto.nombre", "El nombre del contacto es requerido")
        .not()
        .isEmpty()
        .trim(),
      check("Contacto.apellidos", "Los apellidos del contacto son requeridos")
        .not()
        .isEmpty()
        .trim(),
      check("Contacto.telefono", "El telefono es obligatorio")
        .not()
        .isEmpty()
        .trim()
        .isInt(),
      check("Contacto.correo", "El correo electronico es obligatorio")
        .not()
        .isEmpty()
        .trim()
        .isEmail(),
      check("Contacto.direccion1", "La direccion #1 del contacto es requerida")
        .not()
        .isEmpty()
        .trim(),
      check("Contacto.ciudad", "La ciudad del contacto es requerida")
        .not()
        .isEmpty()
        .trim(),
      check("Contacto.provincia", "La provincia del contacto es requerida")
        .not()
        .isEmpty()
        .trim(),
      check("Contacto.codigo", "El codigo postal es requerido")
        .not()
        .isEmpty()
        .trim(),
      validarCampos,
    ],
    pedido.editarPedido
  );

  // app.delete("/Productos/EliminarProducto/:id", producto.eliminarProducto )
};
