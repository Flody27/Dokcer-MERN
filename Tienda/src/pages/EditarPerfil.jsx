/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import axios from "axios";

export default function EditarPerfil() {
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const params = useParams();
  const [usuario, setUsuario] = useState({
    Nombre: "",
    Apellidos: "",
    Telefono: "",
    CorreoElectronico: "",
    Direccion: "",
    DireccionAlt: "",
    Provincia: "",
    Ciudad: "",
    CodigoPostal: "",
    FotoPerfil: "",
  });
  const [imgUI, setImgUI] = useState("");
  const [imgOG, setImgOG] = useState("");
  const [imgElimar, setImgEliminar] = useState("");

  useEffect(() => {
    if (params.id) obtenerUsuario();
  }, []);

  async function obtenerUsuario() {
    await axios.get(`${ruta}BuscarCliente/${params.id}`).then((res) => {
      setUsuario(res.data);
      setImgOG(`${ruta}${res.data.FotoPerfil}`);
      setImgUI(`${ruta}${res.data.FotoPerfil}`);
      setImgEliminar(res.data.FotoPerfil);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !campoValido("Nombre") &&
      !campoValido("Apellidos") &&
      !campoValido("CorreoElectronico")
    ) {
      return;
    }

    let usuarioTemp = { ...usuario, FotoPerfil: usuario.FotoPerfil };

    if (imgOG !== imgUI) {
      const formData = new FormData();
      formData.append("images", usuario.FotoPerfil);
      const response = await axios.post(`${ruta}upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      usuarioTemp = {
        ...usuario,
        FotoPerfil: response.data[0].toString(),
        ElimiarFoto: imgElimar,
      };
    }

    await axios
      .put(`${ruta}EditarCliente/${params.id}`, usuarioTemp)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Cambios aplicados con éxito",
          timer: 2000,
        }).then(() => {
          window.location.replace("/perfil");
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
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
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

  function rederizarImagen(e) {
    const imageFile = e.target.files[0];
    const imageBlob = URL.createObjectURL(imageFile);
    setImgUI(imageBlob);
    setUsuario({ ...usuario, FotoPerfil: imageFile });
  }

  return (
    <>
      <Navbar title="Editar perfil" />
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="card m-4 perfil-card">
              <div className="card-body text-center">
                <img
                  src={imgUI}
                  alt="Foto perfil"
                  className="rounded-circle img-fluid"
                  style={{ width: 150, height: 150 }}
                />
                <div className="d-flex justify-content-center p-3">
                  <label className="label-img" htmlFor="FotoPerfil">
                    <i className="ti-pencil"></i> &nbsp;Cambiar foto
                  </label>
                  <input
                    type="file"
                    className="input-img"
                    name="FotoPerfil"
                    id="FotoPerfil"
                    onChange={rederizarImagen}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="card m-4 perfil-card">
              <form
                data-parsley-validate
                data-parsley-focus="none"
                className="body form-valid"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-lg-6">
                    <b>Nombre</b>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        maxLength="50"
                        className="form-control"
                        placeholder="Ingrese su nombre"
                        aria-label="NombreCliente"
                        name="Nombre"
                        id="Nombre"
                        value={usuario.Nombre}
                        data-parsley-required-message="Campo requerido"
                        onChange={handleInputChange}
                        required
                        pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                        data-parsley-pattern-message="No se admite números y caracteres especiales"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <b>Apellidos</b>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        maxLength="50"
                        className="form-control"
                        placeholder="Ingrese sus apellidos"
                        aria-label="ApellidosCliente"
                        name="Apellidos"
                        id="Apellidos"
                        value={usuario.Apellidos}
                        data-parsley-required-message="Campo requerido"
                        onChange={handleInputChange}
                        required
                        pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                        data-parsley-pattern-message="No se admite números y caracteres especiales"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <b>Teléfono</b>
                    <div className="form-group mb-3">
                      <input
                        type="number"
                        className="form-control "
                        placeholder="Ingrese su telefono"
                        aria-label="TelefonoCliente"
                        name="Telefono"
                        id="Telefono"
                        value={usuario.Telefono}
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

                  <div className="col-lg-6">
                    <b>Correo electrónico</b>
                    <div className="form-group mb-3">
                      <input
                        type="email"
                        className="form-control email"
                        placeholder="Ingrese su correo electrónico"
                        aria-label="CorreoCliente"
                        name="CorreoElectronico"
                        id="Correo"
                        maxLength="50"
                        value={usuario.CorreoElectronico}
                        data-parsley-type="email"
                        data-parsley-type-message="Formato de correo electrónico inválido"
                        data-parsley-required-message="Campo requerido"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <b>Dirección</b>
                    <div className="form-group mb-3">
                      <textarea
                        name="Direccion"
                        id="Direccion"
                        maxLength="200"
                        aria-label="DireccionCliente"
                        placeholder="Ingrese la dirección del cliente"
                        rows="3"
                        className="form-control"
                        value={usuario.Direccion}
                        onChange={handleInputChange}
                        required
                        data-parsley-required-message="Campo requerido"
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <b>Dirección Alternativa</b>
                    <div className="form-group mb-3">
                      <textarea
                        name="DireccionAlt"
                        id="DireccionAlt"
                        maxLength="200"
                        aria-label="DireccionCliente"
                        placeholder="Ingrese la dirección del cliente"
                        rows="3"
                        className="form-control"
                        value={usuario.DireccionAlt}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <b>Provincia</b>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese su pais"
                        aria-label="ProvinciaCliente"
                        name="Provincia"
                        id="Provincia"
                        value={usuario.Provincia}
                        onChange={handleInputChange}
                        required
                        data-parsley-required-message="Campo requerido"
                        pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                        data-parsley-pattern-message="No se admite números y caracteres especiales"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <b>Ciudad</b>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese su pais"
                        aria-label="CiudadCliente"
                        name="Ciudad"
                        id="Ciudad"
                        value={usuario.Ciudad}
                        onChange={handleInputChange}
                        required
                        data-parsley-required-message="Campo requerido"
                        pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                        data-parsley-pattern-message="No se admite números y caracteres especiales"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <b>Codigo Postal</b>
                    <div className="form-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Ingrese su codigo postal"
                        aria-label="CodigoPostalCliente"
                        name="CodigoPostal"
                        id="CodigoPostal"
                        value={usuario.CodigoPostal}
                        onChange={handleInputChange}
                        required
                        data-parsley-required-message="Campo requerido"
                        min="0"
                        data-parsley-min-message="Debe ser un valor no negativo"
                        data-parsley-length="[5, 5]"
                        data-parsley-length-message="Debe ser 5 dígitos de largo"
                        data-parsley-type="integer"
                        data-parsley-type-message="Campo numérico"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-1g-12">
                  <button type="submit" className="btn btn-warning btn-block">
                    Guardar cambios
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={() => window.history.back()}
                  >
                    Cancelar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
