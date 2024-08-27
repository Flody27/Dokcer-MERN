const Pago = require("../Models/PagoPendiente.model");
const sendEmail = require("../Helpers/sendEmail.js");
const { RecordatorioPago } = require("../utils/MailTemplate.js");

exports.crear = (req, res) => {
  const { Entidad, Monto, FechaLimite, Estado } = req.body;

  const pago = new Pago({
    Entidad,
    Monto,
    FechaLimite,
    Estado,
  });

  pago
    .save()
    .then(() => {
      res.send({ message: "Pago agregado exitosamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss hubo un error agregando el pago",
      });
    });
};

exports.buscarPagos = (req, res) => {
  Pago.find()
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Opss. Tuvimos un error al obtener los pagos pendientes.",
      });
    });
};

exports.buscarPago = (req, res) => {
  Pago.findById(req.params.id)
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss. Tuvimos un error al obtener el pago ",
      });
    });
};

exports.editar = async (req, res) => {
  const { Entidad, Monto, FechaLimite, Estado } = req.body;

  let cambioEstado = await Pago.findById(req.params.id)
    .then((data) => {
      return data.Estado !== Estado ? true : false;
    })
    .catch(() => {
      return false;
    });

  await Pago.findByIdAndUpdate(
    req.params.id,
    {
      Entidad,
      Monto,
      FechaLimite,
      Estado,
    },
    { new: true }
  )
    .then((data) => {
      handleEstadoPago(cambioEstado, data);
      res.send({ message: "Se actulizo correctamente el pago" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss. Tuvimos un error al actualizar ",
      });
    });
};

exports.eliminar = (req, res) => {
  Pago.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: "El pago se elimino correctamente" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Opss. Tuvimos un error al eliminar el pago ",
      });
    });
};

exports.ProximosPagos = async (req, res) => {
  const pipeline = [
    {
      $match: {
        FechaLimite: {
          $gte: new Date(),
        },
        Estado: "Pendiente",
      },
    },
    {
      $addFields: {
        faltaDias: {
          $subtract: ["$FechaLimite", new Date()],
        },
      },
    },
    {
      $match: {
        faltaDias: {
          $lte: 1296000000,
          $gte: 86400000,
        },
      },
    },
    {
      $sort: {
        faltaDias: 1,
      },
    },
  ];

  Pago.aggregate(pipeline)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.Recordatorio = async () => {
  let PagosPendientes;

  const pipeline = [
    {
      $match: {
        FechaLimite: {
          $gte: new Date(),
        },
        Estado: "Pendiente",
      },
    },
    {
      $addFields: {
        faltaDias: {
          $subtract: ["$FechaLimite", new Date()],
        },
      },
    },
    {
      $match: {
        faltaDias: {
          $lte: 1296000000,
          $gte: 86400000,
        },
      },
    },
    {
      $sort: {
        faltaDias: 1,
      },
    },
  ];

  let res = await Pago.aggregate(pipeline)
    .then((data) => {
      return data;
    })
    .catch(() => {
      return null;
    });

  PagosPendientes = res;

  if (PagosPendientes.length >= 1 && PagosPendientes !== null) {
    await sendEmail(
      process.env.CORREO_ADMIN,
      "Recordatorio de pagos por hacer",
      RecordatorioPago(PagosPendientes)
    );
  }
};

async function handleEstadoPago(cambioEstado, data) {
  if (cambioEstado && data.Estado == "Pagado") {
    let limite = new Date(data.FechaLimite);

    if (limite.getMonth() === 1) {
      limite.setFullYear(limite.getFullYear() + 1);
      limite.setMonth(0);
    } else {
      limite.setMonth(limite.getMonth() + 1);
    }
    await Pago.findByIdAndUpdate(
      data._id,
      {
        Entidad: data.Entidad,
        Monto: data.Monto,
        FechaLimite: limite,
        Estado: "Pendiente",
      },
      { new: true }
    )
      .then(() => {
        console.log("Cambio pago pendiente");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
