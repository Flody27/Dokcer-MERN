import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InfoClinte() {
  const titulo = "Informacion cliente";
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const params = useParams();

  const [cliente, setCliente] = useState({
    Nombre: "",
    Apellidos: "",
    Telefono: 0,
    CorreoElectronico: "",
    Direccion: "",
    DireccionAlt: "",
    Provincia: "",
    Ciudad: "",
    CodigoPostal: "",
    estado: false,
  });

  useEffect(() => {
    if (params.id) getCliente();
  }, []);

  async function getCliente() {
    const res = await axios.get(`${ruta}BuscarCliente/${params.id}`);
    setCliente(res.data);
  }

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
                  <div className="form-group mb-3">{cliente.Nombre}</div>
                </div>

                <div className="col-lg-4">
                  <b>Apellido</b>
                  <div className="form-group mb-3">{cliente.Apellidos}</div>
                </div>

                <div className="col-lg-4">
                  <b>Teléfono</b>
                  <div className="form-group mb-3">
                    {cliente.Telefono == null ? "N/A" : cliente.Telefono}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Correo</b>
                  <div className="form-group mb-3">
                    {cliente.CorreoElectronico}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Direccion</b>
                  <div className="form-group mb-3">
                    {cliente.Direccion == null ? "N/A" : cliente.Direccion}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Direccion Alternativa</b>
                  <div className="form-group mb-3">
                    {cliente.DireccionAlt == null
                      ? "N/A"
                      : cliente.DireccionAlt}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Provincia</b>
                  <div className="form-group mb-3">
                    {cliente.Provincia == null ? "N/A" : cliente.Provincia}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Ciudad</b>
                  <div className="form-group mb-3">
                    {cliente.Ciudad == null ? "N/A" : cliente.Ciudad}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Codigo postal</b>
                  <div className="form-group mb-3">
                    {cliente.CodigoPostal == null
                      ? "N/A"
                      : cliente.CodigoPostal}
                  </div>
                </div>
                <div className="col-lg-4">
                  <b>Estado de cuenta</b>
                  <div className="form-group mb-3">
                    {cliente.estado ? "Activa" : "Desactivada"}
                  </div>
                </div>

                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-warning btn-block"
                    onClick={() => {
                      window.location.replace("/Clientes");
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
