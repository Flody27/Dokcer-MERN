import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InfoProducto() {
  const [productoEncontrado, setProductoEncontrado] = useState({});

  useEffect(() => {
    const idRuta = window.location.pathname.split("/")[2];
    const ruta =
      process.env.REACT_APP_RUTA_DEV + "Productos/ObtenerProducto/" + idRuta;

    axios
      .get(ruta)
      .then((resp) => {
        setProductoEncontrado(resp.data.producto);
      })
      .catch((err) => console.log(err));
  }, []);

  const titulo = "Informacion Producto";

  return (
    <Layout title={titulo}>
      <Navbar title={titulo} />
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="body row">
                <div className="col-lg-4">
                  <b>Nombre</b>
                  <div className="form-group mb-3">
                    {productoEncontrado.Nombre}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Precio</b>
                  <div className="form-group mb-3">
                    ₡{productoEncontrado.Precio}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Cantidad</b>
                  <div className="form-group mb-3">
                    {productoEncontrado.Cantidad}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Descripción</b>
                  <div className="form-group mb-3">
                    {productoEncontrado.Descripcion}
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-warning btn-block"
                    onClick={() => {
                      window.location.replace("/Productos");
                    }}
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
