import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ConfirmarCuenta() {
  const params = useParams();
  const ruta = process.env.REACT_APP_RUTA_DEV + "ConfirmarCuenta";

  function confirmarCuenta(e) {
    e.preventDefault();
    console.log(params.id);
    if (!params.id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error activando su cuenta comuníquese con el administrador",
      });
      return;
    }
    axios
      .post(`${ruta}/${params.id}`)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Cuenta activada con éxito",
          timer: 2500,
        }).then(() => {
          window.location.replace("/login");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            "Hubo un error activando su cuenta comuníquese con el administrador" ||
            err,
        });
      });
  }

  return (
    <div id="wrapper">
      <div className="vertical-align-wrap">
        <div className="vertical-align-middle auth-main">
          <div className="auth-box">
            <div className="card">
              <div className="btn-home">
                <a href="/">
                  <i className="ti-home" />
                  Volver a la tienda
                </a>
              </div>
              <div className="header">
                <p className="lead">Confirmar cuenta</p>
              </div>
              <div className="body">
                <form className="form-auth-small" onSubmit={confirmarCuenta}>
                  <p className="my-3">
                    Al darle clic al botón confirmar cuenta se activará su
                    cuenta para poder usarla en nuestra tienda.
                  </p>
                  <button
                    type="submit"
                    className="btn btn-warning btn-lg btn-block"
                  >
                    Confirmar Cuenta
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
