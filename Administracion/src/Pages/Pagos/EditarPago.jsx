/* eslint-disable no-undef */
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditarPago() {
  const titulo = "Editar pago";
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const params = useParams();

  const [pago, setPago] = useState({
    Entidad: "",
    Monto: 0,
    FechaLimite: "",
    Estado: "",
  });

  useEffect(() => {
    if (params.id) getPago();
  }, []);

  async function getPago() {
    const res = await axios.get(`${ruta}PagoPendiente/${params.id}`);
    setPago(res.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !campoValido("Entidad") &&
      !campoValido("Monto") &&
      !campoValido("FechaLimite") &&
      !campoValido("Estado")
    ) {
      return;
    }

    await axios
      .put(`${ruta}EditarPagoPendiente/${params.id}`, pago)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "cambios aplicados con exito",
          timer: 2000,
        }).then(() => {
          window.location.replace("/Pagos");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error aplicando cambios.",
          html: err.response.data.message,
          timer: 2500,
        });
      });
  };

  const handleInputChange = (e) => {
    setPago({ ...pago, [e.target.name]: e.target.value });
    $(`#${e.target.id}`).parsley().validate();
  };

  function campoValido(campo) {
    if ($(`#${campo}`).parsley().isValid()) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: $(`#${campo}`).parsley().getErrorsMessages(),
        timer: 2500,
      });
    }
  }

  return (
    <Layout title={titulo}>
      <Navbar title={titulo} />
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <form
              data-parsley-validate
              data-parsley-focus="none"
              className="card form-valid"
              onSubmit={handleSubmit}
            >
              <div className="body">
                <div className="col-lg-12 my-2">
                  <small>
                    <i className="icn-obligatorio">*</i> Campo obligatorio
                  </small>
                </div>
                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Nombre de la entidad a pagar</b>{" "}
                  <small>(100 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese el nombre de la entidad a pagar"
                      aria-label="NombreDelPago"
                      data-parsley-required-message="campo requerido"
                      name="Entidad"
                      maxLength="100"
                      data-parsley-maxlength-message="el campo soporta un maximo de 100 caracteres"
                      value={pago.Entidad}
                      id="Entidad"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Monto a pagar</b> <small>(9 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      min="0"
                      className="form-control num-form"
                      placeholder="$1000"
                      aria-label="MontoDelPago"
                      name="Monto"
                      id="Monto"
                      value={pago.Monto}
                      data-parsley-type="integer"
                      data-parsley-type-message="campo numerico"
                      data-parsley-required-message="campo requerido"
                      data-parsley-min-message="No se admiten numeros negativos"
                      maxLength="9"
                      data-parsley-maxlength-message="No puede ser mas de 9 dígitos de largo"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Fecha del pago</b>
                  <div className="form-group mb-3">
                    <input
                      type="date"
                      className="form-control date"
                      aria-label="FechaDelPago"
                      value={pago.FechaLimite.substring(0, 10)}
                      name="FechaLimite"
                      id="FechaLimite"
                      data-parsley-required
                      data-parsley-required-message="Selecione una fecha"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Estado del pago</b>
                  <div className="form-group mb-3">
                    <select
                      className="custom-select"
                      id="Estado"
                      name="Estado"
                      value={pago.Estado}
                      data-parsley-required
                      data-parsley-required-message="Selecione un estado del pago"
                      onChange={handleInputChange}
                    >
                      <option
                        disabled
                        selected
                        defaultValue="Selecione el estado del pago"
                      >
                        Selecione el estado del pago
                      </option>
                      <option defaultValue="Pagado">Pagado</option>
                      <option defaultValue="Pendiente">Pendiente</option>
                    </select>
                  </div>
                </div>

                <div className="col-1g-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-animated btn-animated-y"
                  >
                    Editar pago
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={() => {
                      window.location.replace("/Pagos");
                    }}
                  >
                    Cancelar cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
