import React from 'react'

const FavoritosTarjeta = ({ producto, descripcion, rutaImagen, costo }) => {
  return (
      <div class="card mb-3" style={{ maxWidth: 540 }}>
            <div class="row g-0">
                  <div class="col-md-4">
                        <img src={rutaImagen} class="img-fluid rounded-start" alt="productos" />
                  </div>
                  <div class="col-md-8">
                        <div class="card-body">
                              <p class="card-text"> Producto: <br /> {producto} </p>
                              <p class="card-text"> Descripción: <br /> {descripcion} </p>
                              <p className="card-text text-center">Costo: <strong>¢{costo}</strong> </p>
                        </div>
                  </div>
            </div>
      </div>
  )
}

export default FavoritosTarjeta