const nodemailer = require("nodemailer");

module.exports = async (email, subject, correo) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.CORREO,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.CORREO,
      to: email,
      subject: subject,
      html: correo,
    });

    console.log("Correo enviado con exito");
  } catch (error) {
    console.log("No se pudo enviar el correo");
    console.log(error);
  }
};
