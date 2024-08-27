import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Perfil = () => {
  const ruta = process.env.REACT_APP_RUTA_DEV;
  let token = localStorage.getItem("token");
  if (!token) {
    window.location = "/";
  }

  const [usuario, setUsuario] = useState({
    Nombre: "",
    Apellidos: "",
    CorreoElectronico: "",
    Telefono: 0,
    Direccion: "",
    DireccionAlt: "",
    Provincia: "",
    Ciudad: "",
    CodigoPostal: "",
    FotoPerfil: "",
  });

  let usuarioLS = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (usuarioLS) {
      obtenerUsuario();
    }
  });

  async function obtenerUsuario() {
    const res = await axios.get(`${ruta}BuscarCliente/${usuarioLS._id}`);
    setUsuario(res.data);
  }

  function esVacio(valor) {
    return !valor || valor === "" ? "N/A" : valor;
  }

  return (
    <>
      {/* NAVBAR */}
      <Navbar title="Perfil" />

      {/* Main de la pagina */}
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="card m-4 perfil-card">
              <div className="card-body text-center">
                <img
                  src={`${ruta}${usuario.FotoPerfil}`}
                  alt="Foto perfil"
                  className="rounded-circle img-fluid"
                  style={{ width: 150, height: 150 }}
                />
                <h5 className="my-3">
                  {usuario.Nombre + " " + usuario.Apellidos}
                </h5>
                <div className="d-flex justify-content-center p-3">
                  <a
                    className="btn btn-warning"
                    href={`/editar/${usuarioLS._id}`}
                  >
                    <i className="ti-pencil"></i> Editar información
                  </a>
                </div>
                <div class="d-flex justify-content-center p-3">
                  <a className="btn btn-danger" href="/restablecercontraseña">
                    Cambiar contraseña
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card m-4 perfil-card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Nombre</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{usuario.Nombre}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Apellidos</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{usuario.Apellidos}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Correo electrónico</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {usuario.CorreoElectronico}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Teléfono</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {esVacio(usuario.Telefono)}
                    </p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Dirección</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {esVacio(usuario.Direccion)}
                    </p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Dirección Alternativa</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {esVacio(usuario.DireccionAlt)}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Provincia</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {esVacio(usuario.Provincia)}
                    </p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Ciudad</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{esVacio(usuario.Ciudad)}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Codigo postal</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {esVacio(usuario.CodigoPostal)}
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Perfil;
