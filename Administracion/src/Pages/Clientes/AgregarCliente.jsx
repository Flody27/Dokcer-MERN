/* eslint-disable no-undef */
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AgregarCliente() {
  const titulo = "Agregar cliente";
  const ruta = process.env.REACT_APP_RUTA_DEV + "AgregarCliente";

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
    CodigoActivacion: "",
  });

  useEffect(() => {
    generarCodigo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !campoValido("Nombre") &&
      !campoValido("Apellidos") &&
      !campoValido("Telefono") &&
      !campoValido("CorreoElectronico") &&
      !campoValido("CodigoPostal") &&
      !campoValido("Direccion")
    ) {
      return;
    }

    await axios
      .post(ruta, cliente)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Cliente agregado con éxito",
          timer: 2000,
        }).then(() => {
          window.location.replace("/Clientes");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error agregando cliente.",
          html: err.response.data.message,
          timer: 2500,
        });
      });
  };

  const handleInputChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
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

  function generarCodigo() {
    var longitud = 8,
      caracteres =
        "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      codGenerado = "";
    for (var i = 0, n = caracteres.length; i < longitud; ++i) {
      codGenerado += caracteres.charAt(Math.floor(Math.random() * n));
    }

    return setCliente({ ...cliente, CodigoActivacion: codGenerado });
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
              <div className="body row">
                <div className="col-lg-12 my-2">
                  <small>
                    <i className="icn-obligatorio">*</i> Campo obligatorio
                  </small>
                </div>
                <div className="col-lg-6">
                  <i className="icn-obligatorio">*</i>
                  <b>Nombre</b> <small>(50 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="50"
                      className="form-control"
                      placeholder="Ingrese el nombre del cliente"
                      aria-label="NombreCliente"
                      data-parsley-required-message="Campo requerido"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      name="Nombre"
                      id="Nombre"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <i className="icn-obligatorio">*</i>
                  <b>Apellidos</b> <small>(50 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="50"
                      className="form-control"
                      placeholder="Ingrese los apellidos del cliente"
                      aria-label="ApellidosCliente"
                      data-parsley-required-message="Campo requerido"
                      name="Apellidos"
                      id="Apellidos"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <b>Teléfono</b> <small>(8 digitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese el número de teléfono"
                      aria-label="TelefonoCliente"
                      name="Telefono"
                      id="Telefono"
                      data-parsley-length="[8, 8]"
                      data-parsley-length-message="Debe ser 8 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numérico"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <i className="icn-obligatorio">*</i>
                  <b>Correo electrónico</b>{" "}
                  <small>(50 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      maxLength="50"
                      className="form-control email"
                      placeholder="Ingrese el correo electrónico del cliente"
                      aria-label="CorreoElectronicoCliente"
                      name="CorreoElectronico"
                      id="CorreoElectronico"
                      data-parsley-type="email"
                      data-parsley-type-message="Formato de correo electrónico inválido"
                      data-parsley-required-message="Campo requerido"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <b>Dirección</b> <small>(200 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <textarea
                      name="Direccion"
                      id="Direccion"
                      maxLength="200"
                      aria-label="DireccionCliente"
                      placeholder="Ingrese la dirección del cliente"
                      rows="3"
                      class="form-control"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="col-lg-12">
                  <b>Dirección alternativa</b>{" "}
                  <small>(200 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <textarea
                      name="DireccionAlt"
                      id="DireccionAlt"
                      maxLength="200"
                      aria-label="DireccionCliente"
                      placeholder="Ingrese la dirección alternativa del cliente"
                      rows="3"
                      class="form-control"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Provincia</b> <small>(20 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="20"
                      className="form-control"
                      placeholder="Ingrese el pais del cliente"
                      aria-label="PaisCliente"
                      name="Provincia"
                      id="Provincia"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Ciudad</b> <small>(30 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="30"
                      className="form-control"
                      placeholder="Ingrese el pais del cliente"
                      aria-label="PaisCliente"
                      name="Ciudad"
                      id="Ciudad"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Codigo Postal</b> <small>(5 máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese el codigo postal del cliente"
                      aria-label="CodigoPostalCliente"
                      name="CodigoPostal"
                      id="CodigoPostal"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-length="[5, 5]"
                      data-parsley-length-message="Debe ser 5 dígitos de largo"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col">
                  <button type="submit" className="btn btn-primary btn-block">
                    Agregar cliente
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={() => {
                      window.location.replace("/Clientes");
                    }}
                  >
                    Cancelar
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
