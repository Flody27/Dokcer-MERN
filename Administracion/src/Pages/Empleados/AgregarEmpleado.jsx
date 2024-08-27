/* eslint-disable no-undef */
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AgregarEmpleado() {
  const titulo = "Agregar empleado";
  const ruta = process.env.REACT_APP_RUTA_DEV + "AgregarEmpleado";

  const [empleado, setEmpleado] = useState({
    Nombre: "",
    Apellidos: "",
    Telefono: 0,
    Cedula: 0,
    CorreoElectronico: "",
    Puesto: "",
    Sueldo: 0,
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
      !campoValido("Cedula") &&
      !campoValido("Telefono") &&
      !campoValido("CorreoElectronico") &&
      !campoValido("Puesto") &&
      !campoValido("Sueldo")
    ) {
      return;
    }

    await axios
      .post(ruta, empleado)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Empleado agregado con éxito",
          timer: 2000,
        }).then(() => {
          window.location.replace("/Empleados");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error agregando empleado.",
          html: err.response.data.message,
          timer: 2500,
        });
      });
  };

  const handleInputChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
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

    return setEmpleado({ ...empleado, CodigoActivacion: codGenerado });
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
                  <b>Nombre del empleado</b>{" "}
                  <small>(50 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="50"
                      className="form-control"
                      placeholder="Ingrese el nombre del empleado"
                      aria-label="NombreEmpleado"
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
                      placeholder="Ingrese los apellidos del empleado"
                      aria-label="ApellidosEmpleado"
                      data-parsley-required-message="Campo requerido"
                      name="Apellidos"
                      id="Apellidos"
                      required
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Cédula</b> <small>(9 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese el número de identificación"
                      aria-label="CedulaEmpleado"
                      name="Cedula"
                      id="Cedula"
                      data-parsley-length="[9, 9]"
                      data-parsley-length-message="Debe ser 9 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numérico"
                      required
                      data-parsley-required-message="Campo requerido"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Teléfono</b> <small>(8 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese el número de teléfono"
                      aria-label="TelefonoEmpleado"
                      name="Telefono"
                      id="Telefono"
                      data-parsley-length="[8, 8]"
                      data-parsley-length-message="Debe ser 8 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numérico"
                      required
                      data-parsley-required-message="Campo requerido"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Correo electrónico</b>{" "}
                  <small>(50 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      maxLength="50"
                      className="form-control email"
                      placeholder="Ingrese el correo del empleado"
                      aria-label="CorreoElectronicoEmpleado"
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

                <div className="col-lg-6">
                  <i className="icn-obligatorio">*</i>
                  <b>Puesto</b> <small>(30 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="30"
                      className="form-control"
                      placeholder="Ingrese el puesto del empleado"
                      aria-label="PuestoEmpleado"
                      name="Puesto"
                      id="Puesto"
                      data-parsley-required-message="Campo requerido"
                      required
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <i className="icn-obligatorio">*</i>
                  <b>Sueldo</b> <small>(9 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese el sueldo del empleado"
                      aria-label="SueldoEmpleado"
                      name="Sueldo"
                      id="Sueldo"
                      maxLength="9"
                      data-parsley-maxlength-message="No puede ser mas de 9 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numérico"
                      required
                      data-parsley-required-message="Campo requerido"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-animated btn-animated-y"
                  >
                    Agregar empleado
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={() => {
                      window.location.replace("/Empleados");
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
