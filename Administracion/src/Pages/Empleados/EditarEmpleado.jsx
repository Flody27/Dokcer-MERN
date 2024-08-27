/* eslint-disable no-undef */
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditarEmpleado() {
  const titulo = "Editar empleado";
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const params = useParams();

  const [empleado, setEmpleado] = useState({
    Nombre: "",
    Apellidos: "",
    Telefono: "00000000",
    Cedula: 0,
    CorreoElectronico: "",
    Puesto: "",
    Sueldo: 0,
    estado: false,
  });

  useEffect(() => {
    if (params.id) getEmpleado();
  }, []);

  async function getEmpleado() {
    const res = await axios.get(`${ruta}BuscarEmpleado/${params.id}`);
    setEmpleado(res.data);
  }

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
      .put(`${ruta}EditarEmpleado/${params.id}`, empleado)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Cambios aplicados con éxito",
          timer: 2000,
        }).then(() => {
          window.location.replace("/Empleados");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error al aplicar los cambios.",
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

  function setEstado(e) {
    setEmpleado({ ...empleado, estado: e.target.checked });
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
                      placeholder="Ingrese el nombre del empleado"
                      aria-label="NombreEmpleado"
                      name="Nombre"
                      id="Nombre"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      value={empleado.Nombre}
                      data-parsley-required-message="Campo requerido"
                      onChange={handleInputChange}
                      required
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
                      name="Apellidos"
                      id="Apellidos"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      value={empleado.Apellidos}
                      data-parsley-required-message="Campo requerido"
                      onChange={handleInputChange}
                      required
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
                      placeholder="Ingrese la cedula del empleado"
                      aria-label="CedulaEmpleado"
                      name="Cedula"
                      id="Cedula"
                      value={empleado.Cedula}
                      data-parsley-required-message="Campo requerido"
                      data-parsley-length="[9, 9]"
                      data-parsley-length-message="Debe ser 9 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numerico"
                      onChange={handleInputChange}
                      required
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
                      placeholder="Ingrese el teléfono del empleado"
                      aria-label="TelefonoEmpleado"
                      name="Telefono"
                      id="Telefono"
                      value={empleado.Telefono}
                      required
                      data-parsley-required-message="Campo requerido"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numérico"
                      data-parsley-length="[8, 8]"
                      data-parsley-length-message="Debe ser 8 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
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
                      className="form-control email"
                      maxLength="50"
                      placeholder="Ingrese el correo del empleado"
                      aria-label="CorreoEmpleado"
                      name="CorreoElectronico"
                      id="CorreoElectronico"
                      value={empleado.CorreoElectronico}
                      data-parsley-type="email"
                      data-parsley-type-message="Formato de correo electronico invalido"
                      data-parsley-required-message="Campo requerido"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-4">
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
                      value={empleado.Puesto}
                      data-parsley-required-message="Campo requerido"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-4">
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
                      value={empleado.Sueldo}
                      required
                      data-parsley-required-message="Campo requerido"
                      maxLength="9"
                      data-parsley-maxlength-message="No puede ser mas de 9 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numerico"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Estado de cuenta</b>
                  <div className="form-group mb-3">
                    <input
                      type="checkbox"
                      checked={empleado.estado}
                      onClick={setEstado}
                    />
                  </div>
                </div>

                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-animated btn-animated-y"
                  >
                    Editar empleado
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={() => {
                      window.location.replace("/Empleados");
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
