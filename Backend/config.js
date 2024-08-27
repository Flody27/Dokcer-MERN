require("dotenv").config();

const DB_USUARIO = process.env.DB_USUARIO;
const DB_CLAVE = process.env.DB_CLAVE;

module.exports = {
  url: `mongodb://127.0.0.1:27017/LaMielDePao`,
};
