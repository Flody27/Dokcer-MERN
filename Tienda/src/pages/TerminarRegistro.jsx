import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

export default function TerminarRegistro() {
  const ruta = process.env.REACT_APP_RUTA_DEV;
  window.document.title = "La Miel de Pao | Terminar Registro";
  const params = useParams();
  const recaptcha = useRef();

  const [cliente, setCliente] = useState({
    id: "",
    Contrasena: "",
    CodigoActivacion: "",
  });

  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    if (params.id) getEmpleado();
  }, []);

  async function getEmpleado() {
    const res = await axios.get(`${ruta}BuscarCliente/${params.id}`);
    setCliente({
      ...cliente,
      CodigoActivacion: res.data.CodigoActivacion,
      id: res.data._id,
    });
  }

  function campoValido(campo) {
    // eslint-disable-next-line no-undef
    if ($(`#${campo}`).parsley().isValid()) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        // eslint-disable-next-line no-undef
        title: $(`#${campo}`).parsley().getErrorsMessages(),
        timer: 2500,
      });
    }
  }

  async function registrar(e) {
    e.preventDefault();

    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      return Swal.fire({
        icon: "error",
        title: "Por favor, marca el reCAPTCHA.",
        timer: 1500,
      });
    }

    if (!verificarCodigo()) {
      Swal.fire({
        icon: "error",
        title: "Error codigo de confirmación incorrecto",
        timer: 2500,
      });
      return;
    }

    if (!campoValido("Contrasena")) {
      return;
    }

    await axios
      .post(ruta + "TerminarRegistro", cliente)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registro Finalizado",
          timer: 2500,
        }).then(() => {
          window.location.replace("/login");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error registrando.",
          html: err.response.data.msg,
          timer: 2500,
        });
      });
  }

  function verificarCodigo() {
    return codigo === cliente.CodigoActivacion ? true : false;
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
                <p className="lead">Terminar registro</p>
              </div>
              <div className="body">
                <form
                  className="form-auth-small"
                  onSubmit={registrar}
                  data-parsley-validate
                  data-parsley-focus="none"
                >
                  <div className="little">
                    <p>Ingrese los datos solicitados para iniciar sesión</p>
                  </div>
                  <div className="form-group ">
                    <input
                      type="text"
                      className="form-control my-2"
                      id="codigo"
                      name="codigo"
                      placeholder="Codigo de confirmación"
                      required
                      onChange={(e) => {
                        setCodigo(e.target.value);
                      }}
                    />
                    <input
                      type="password"
                      className="form-control my-2"
                      id="Contrasena"
                      name="Contrasena"
                      placeholder="Contraseña nueva"
                      data-parsley-required-message="Campo contraseña requerido"
                      data-parsley-pattern="/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/"
                      data-parsley-pattern-message="Formato de la contraseña incorrecto"
                      required
                      autoComplete=""
                      onChange={(e) => {
                        setCliente({
                          ...cliente,
                          Contrasena: e.target.value,
                        });
                      }}
                    />
                    <div className="little">
                      <p>La contraseña debe de poseer lo siguiente:</p>
                      <ul>
                        <li>Una mayúscula</li>
                        <li>Una minúscula</li>
                        <li>Un número y carácter especial</li>
                        <li>Mínimo un largo de 8 dígitos</li>
                      </ul>
                    </div>
                  </div>
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_SITE_KEY}
                    ref={recaptcha}
                    style={{
                      transform: "scale(0.80)",
                      transformOrigin: "0 0",
                      marginLeft: 10,
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-warning btn-lg btn-block"
                  >
                    Registrar
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
