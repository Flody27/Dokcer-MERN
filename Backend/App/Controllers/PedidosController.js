const PedidoM = require("../Models/Pedido.model");
const ProductoM = require("../Models/ProductoModel");
const UsuarioM = require("../Models/Usuario.model");
const sendEmail = require("../Helpers/sendEmail.js");
const {
  CorreoPedido,
  CorreoOrden,
  CorreoPedidoEnviado,
  CorreoPedidoFinalizado,
  CorreoPedidoCancelado,
  CorreoPedidoPendiente,
} = require("../utils/MailTemplate.js");
// const { resolveContent } = require("nodemailer/lib/shared");

exports.obtenerPedidosPorUsuario = async (req, res) => {
  const { user } = req.params;

  try {
    const pedidos = await PedidoM.find({ Usuario: user });

    return res.status(200).json({
      ok: true,
      pedidos,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Ha ocurrido un error con el servidor",
      productos: [],
    });
  }
};

exports.obtenerPedidoPorId = async (req, res) => {
  const { id } = req.params;

  if (id == null || id == undefined) {
    return res.status(204).send({
      message: "Debe colocar el id del pedido",
    });
  }

  try {
    const pedido = await PedidoM.findById(id);

    if (pedido == null || pedido == undefined) {
      return res.status(400).send({
        message: "El pedido a buscar es invalido o no existe",
      });
    }

    return res.status(200).json({
      pedido,
    });
  } catch (error) {
    return res.status(400).json({
      message: "El producto a buscar es invalido o no existe",
    });
  }
};

exports.obtenerPedidos = async (req, res) => {
  PedidoM.find()
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss. Tuvimos un error al obtener los pedidos",
      });
    });
};

exports.registrarPedidoSinpe = async (req, res) => {
  const {
    Usuario = "",
    Productos = [],
    NumeroFactura,
    Identificacion,
    Contacto = {},
  } = req.body;
  var costoTotal = 0;

  Productos.forEach((element) => {
    costoTotal += element.precio * element.cantidad;
  });

  if (!Usuario) {
    return res.status(402).send({
      message: "Debe ingresar un usuario para finalizar el pedido",
    });
  }

  if (Productos.length == 0) {
    return res.status(402).send({
      message: "Debe existir al menos un pedido para finalizar el pedido",
    });
  }

  if (NumeroFactura.length < 10) {
    return res.status(402).send({
      message:
        "La factura debe contener al menos 10 digitos para finalizar el pedido",
    });
  }

  const _id = Usuario;
  const usuario = await UsuarioM.findById(_id);

  if (usuario == null || usuario == undefined) {
    return res.status(400).send({
      message: "El usuario ingresado es inválido o no existe",
    });
  }

  const pedido = new PedidoM({
    Usuario: Usuario,
    Productos: Productos,
    MedioPago: "Sinpe",
    NumeroFactura,
    Estado: req.body.Estado ? req.body.Estado : "En Proceso",
    CostoTotal: costoTotal,
    Identificacion,
    Contacto,
  });

  try {
    await pedido
      .save()
      .then(async (data) => {
        res.send(data);
        await sendEmail(
          Contacto.correo,
          "Confiramación de pedido",
          CorreoPedido(
            Productos,
            `${process.env.URL_TIENDA}pedidos`,
            costoTotal.toLocaleString("es")
          )
        );
        await sendEmail(
          process.env.CORREO_ADMIN,
          "Orden - SINPE",
          CorreoOrden(
            Productos,
            Contacto,
            NumeroFactura,
            Identificacion,
            `${process.env.URL_ADMIN}Pedido/${data.id}`,
            costoTotal.toLocaleString("es")
          )
        );
      })
      .catch((err) => {
        res.status(400).send({
          message:
            "Ha ocurrido un error en el servidor al crear el pedido " + err,
        });
      });

    Productos.forEach(async (element) => {
      var producto = await ProductoM.findById(element.id);
      if (producto) {
        producto.Cantidad -= element.cantidad;
        await producto.save();
      }
    });
  } catch (error) {
    return res.status(400).send({
      message: "Ha ocurrido un error con el pedido " + error,
    });
  }
};

exports.editarPedido = async (req, res) => {
  const { id } = req.params;
  const {
    Usuario = "",
    Productos = [],
    NumeroFactura,
    Identificacion,
    Estado,
    Contacto = {},
  } = req.body;
  var costoTotal = 0;

  Productos.forEach((element) => {
    costoTotal += element.precio * element.cantidad;
  });

  if (!Usuario) {
    return res.status(402).send({
      message: "Debe ingresar un usuario para editar el pedido",
    });
  }

  if (Productos.length == 0) {
    return res.status(402).send({
      message: "Debe existir al menos un pedido para editar el pedido",
    });
  }

  if (NumeroFactura.length < 10) {
    return res.status(402).send({
      message:
        "La factura debe contener al menos 10 digitos para finalizar el pedido",
    });
  }

  const _id = Usuario;
  const usuario = await UsuarioM.findById(_id);

  if (usuario == null || usuario == undefined) {
    return res.status(400).send({
      message: "El usuario ingresado es inválido o no existe",
    });
  }

  let cambioEstado = await PedidoM.findById(id)
    .then((data) => {
      return data.Estado !== Estado ? true : false;
    })
    .catch(() => {
      return false;
    });

  try {
    PedidoM.findByIdAndUpdate(
      id,
      {
        Usuario,
        Productos,
        MedioPago: "Sinpe",
        NumeroFactura,
        Estado,
        CostoTotal: costoTotal,
        Identificacion,
        Contacto,
      },
      { new: true }
    )
      .then(async (data) => {
        await handleEstadoPedido(data, cambioEstado, costoTotal);
        res.send({
          message: "Se modifico correctamente el pedido",
        });
      })
      .catch((err) => {
        res.status(400).send({
          message:
            "Ha ocurrido un error en el servidor al modificar el pedido" + err,
        });
      });
  } catch (error) {
    return res.status(400).send({
      message: "Ha ocurrido un error con el pedido " + error,
    });
  }
};

async function handleEstadoPedido(data, cambioEstado, costoTotal) {
  if (cambioEstado) {
    if (data.Estado === "Enviando") {
      await sendEmail(
        data.Contacto.correo,
        "Pedido enviado",
        CorreoPedidoEnviado(
          data.Productos,
          `${process.env.URL_TIENDA}pedidos`,
          costoTotal,
          new Date(data.updatedAt).toLocaleDateString()
        )
      );
    }

    if (data.Estado === "Finalizado") {
      await sendEmail(
        data.Contacto.correo,
        "Pedido finalizado",
        CorreoPedidoFinalizado(
          data.Productos,
          `${process.env.URL_TIENDA}pedidos`
        )
      );
    }

    if (data.Estado === "Pendiente") {
      await sendEmail(
        data.Contacto.correo,
        "Pedido en pendiente",
        CorreoPedidoPendiente(`${process.env.URL_TIENDA}pedidos`)
      );
    }

    if (data.Estado === "Cancelado") {
      data.Productos.forEach(async (element) => {
        var producto = await ProductoM.findById(element.id);
        if (producto) {
          producto.Cantidad += element.cantidad;
          await producto.save();
        }
      });
      await sendEmail(
        data.Contacto.correo,
        "Pedido cancelado",
        CorreoPedidoCancelado(`${process.env.URL_TIENDA}pedidos`)
      );
    }
  }
}
