const Usuario = require("../Models/Usuario.model");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../Helpers/generarJwt.js");
const sendEmail = require("../Helpers/sendEmail.js");
const {
  CorreoActivacion,
  CorreoCambioCredenciales,
} = require("../utils/MailTemplate.js");

exports.Registrarse = async (req, res) => {
  const { Nombre, Apellidos, CorreoElectronico, Contrasena } = req.body;

  const ContraEncriptada = bcrypt.hashSync(Contrasena, 10);

  const usuario = new Usuario({
    Nombre,
    Apellidos,
    CorreoElectronico,
    Contrasena: ContraEncriptada,
  });
  try {
    const verificarExistencia = await Usuario.findOne({
      CorreoElectronico,
    });

    if (verificarExistencia) {
      return res.status(500).json({
        message: "Cuenta ya registrada",
      });
    }

    usuario
      .save()
      .then(async (data) => {
        await sendEmail(
          CorreoElectronico,
          "Activación de cuenta de usuario.",
          CorreoActivacion(
            `${Nombre} ${Apellidos}`,
            // TODO: Remplazar ruta por la ruta de la tienda
            `${process.env.URL_TIENDA}ConfirmarCuenta/${data._id}`
          )
        );
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Opss hubo un error registrando",
        });
      });
  } catch (error) {
    console.log(error);
  }
};

exports.IniciarSesion = async (req, res) => {
  const { CorreoElectronico, Contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ CorreoElectronico });

    //********* */
    //Nunca decirle al usuario si el password y el correo estan erroneos por seguridad
    //********* */
    if (!usuario) {
      return res.status(400).json({
        msg: "Correo electrónico o Contraseña incorrecto - correo",
      });
    }

    if (
      !usuario.estado &&
      new Date(usuario.createdAt).toUTCString() ==
        new Date(usuario.updatedAt).toUTCString() && usuario.rol !== "Admin"
    ) {
      return res.status(400).json({
        msg: "Revise su correo para activar su cuenta",
      });
    }

    //Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Su cuenta se encuentra deshabilitada - Contacte al administrador al correo lamieldepao28@gmail.com",
      });
    }

    const validPassword = bcrypt.compareSync(Contrasena, usuario.Contrasena);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo electrónico o Contraseña incorrecto - password",
      });
    }

    if (!usuario?.Contrasena) {
      return res.status(400).json({
        msg: "Revise su correo para seguir las instrucciones de activacion de cuenta",
      });
    }
    //Verificar la contrasena

    //Generar el jwt
    const token = await generarJWT(
      usuario.id,
      usuario.Nombre,
      usuario.CorreoElectronico
    );

    const usuarioSinPassword = {
      _id: usuario._id,
      Nombre: usuario.Nombre,
      Apellidos: usuario.Apellidos,
      CorreoElectronico: usuario.CorreoElectronico,
      rol: usuario.rol,
    };

    res.json({
      usuario: usuarioSinPassword,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Contacte al administrador al correo lamieldepao28@gmail.com",
    });
  }
};

exports.ConfirmarCuenta = async (req, res) => {
  const { id } = req.params;

  try {
    await Usuario.findByIdAndUpdate(id, { estado: true });

    res.json({
      msg: "Se ha actualizado el usuario",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Contacte al administrador al correo lamieldepao28@gmail.com",
    });
  }
};

exports.SolicitudCambio = async (req, res) => {
  const { CorreoElectronico, Codigo } = req.body;

  try {
    const usuario = await Usuario.findOne({ CorreoElectronico });

    if (!usuario) {
      return res.status(400).json({
        msg: "Correo electrónico incorrecto",
      });
    }

    if (usuario.estado === false) {
      return res.status(500).send({
        message: "No se puede cambiar contraseña a una cuenta deshabilitada",
      });
    }

    sendEmail(
      CorreoElectronico,
      "Cambio de contraseña",
      CorreoCambioCredenciales(Codigo)
    ).then(() => {
      res.send({ message: "Solictud realizada con exito" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Contacte al administrador al correo lamieldepao28@gmail.com",
    });
  }
};

exports.RestablecerCredenciales = async (req, res) => {
  const { CorreoElectronico, Contrasena } = req.body;

  let usuario = await Usuario.findOne({ CorreoElectronico, estado: true });

  if (!usuario || (await bcrypt.compare(Contrasena, usuario.Contrasena))) {
    return res.status(500).json({
      msg: "Error cambiando contraseña",
    });
  }

  let nuevaContra = bcrypt.hashSync(Contrasena, 10);

  try {
    await Usuario.findByIdAndUpdate(
      usuario.id,
      { Contrasena: nuevaContra },
      { new: true }
    )
      .then(async (data) => {
        res.send({ message: "Se actulizó correctamente la contraseña" });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Opss. Tuvimos un error al actualizar ",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Contacte al administrador al correo lamieldepao28@gmail.com",
    });
  }
};

exports.TerminarRegistro = async (req, res) => {
  const { id, Contrasena } = req.body;

  let usuario = await Usuario.findOne({ _id: id });

  if (!usuario) {
    return res.status(500).json({
      msg: "Error registrando",
    });
  }

  if (usuario?.Contrasena) {
    return res.status(498).json({
      msg: "No se puede proceder, cuenta ya activa",
    });
  }

  let nuevaContra = bcrypt.hashSync(Contrasena, 10);

  try {
    await Usuario.findByIdAndUpdate(
      usuario.id,
      { Contrasena: nuevaContra, CodigoActivacion: undefined, estado: true },
      { new: true }
    )
      .then(async (data) => {
        res.send({
          message:
            "Se finalizó con éxito el registro, ya su cuenta queda activada para iniciar sesión",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Opss. Tuvimos un error al actualizar ",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Contacte al administrador al correo lamieldepao28@gmail.com",
    });
  }
};
