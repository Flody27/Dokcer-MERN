module.exports = (app) => {
  const comentario = require("../Controllers/Comentarios.controller");

  app.post("/AgregarComentario", comentario.crear);

  app.get("/Comentarios", comentario.buscarComentarios);

  app.get("/Comentarios/:id", comentario.ComentariosProductos);

  app.put("/EditarComentario/:id", comentario.editar);

  app.delete("/EliminarComentario/:id", comentario.eliminar);
};
