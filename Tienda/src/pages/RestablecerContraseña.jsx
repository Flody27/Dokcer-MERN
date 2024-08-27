import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

export default function RestablecerContraseña() {
  const ruta = process.env.REACT_APP_RUTA_DEV;
  window.document.title = "La Miel de Pao | Cambio de contraseña";
  const [solicitud, setSolicitud] = useState({
    CorreoElectronico: "",
    Codigo: "",
  });
  const [cambio, setCambio] = useState({
    CorreoElectronico: "",
    Contrasena: "",
  });

  const recaptcha = useRef();
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    MostrarTab(0, true);
    generarCodigo();
  }, []);

  function inicioSesion() {
    let token = localStorage.getItem("token");
    return token ? true : false;
  }

  function generarCodigo() {
    var longitud = 8,
      caracteres =
        "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      codGenerado = "";
    for (var i = 0, n = caracteres.length; i < longitud; ++i) {
      codGenerado += caracteres.charAt(Math.floor(Math.random() * n));
    }

    return setSolicitud({ ...solicitud, Codigo: codGenerado });
  }

  function MostrarTab(num, mostrar) {
    var tab = document.getElementsByClassName("tab");
    if (mostrar) {
      tab[num].classList.remove("ocultar");
      return;
    }
    tab[num].classList.add("ocultar");
  }

  function tabSiguiente(siguiente) {
    if (validarTab(siguiente - 1, false)) {
      MostrarTab(siguiente, true);
      MostrarTab(siguiente - 1, false);
    }
  }

  function validarTab(tab) {
    if (tab === 0 && campoValido("CorreoElectronico")) {
      return true;
    }
    if (tab === 1 && campoValido("Contrasena")) {
      return true;
    }
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

  async function solicitudCambio(e) {
    e.preventDefault();

    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      return Swal.fire({
        icon: "error",
        title: "Por favor, marca el reCAPTCHA.",
        timer: 1500,
      });
    }

    await axios
      .post(ruta + "SolicitarCambio", solicitud)
      .then(() => {
        tabSiguiente(1);
        setCambio({
          ...cambio,
          CorreoElectronico: solicitud.CorreoElectronico,
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Error realizando solictud de cambio.",
          html: err.response.data.message,
          timer: 2500,
        });
      });
  }

  async function restablecerCredenciales(e) {
    e.preventDefault();

    if (!verificarCodigo()) {
      Swal.fire({
        icon: "error",
        title: "Error codigo de confirmación incorrecto",
        timer: 2500,
      });
      return tabSiguiente(1);
    }

    await axios
      .post(ruta + "RestablecerCredenciales", cambio)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Cambio de contraseña aplicado",
          timer: 2500,
        }).then(() => {
          if (inicioSesion()) {
            window.location.replace("/perfil");
          } else {
            window.location.replace("/login");
          }
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Error realizando solictud de cambio.",
          html: err.response.data.message,
          timer: 2500,
        });
      });
  }

  function verificarCodigo() {
    return codigo === solicitud.Codigo ? true : false;
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
                <p className="lead">Restablecer contraseña</p>
              </div>
              <div className="body">
                {/* Tab 1 */}
                <form
                  className="form-auth-small tab ocultar"
                  data-parsley-validate
                  data-parsley-focus="none"
                  id="captcha-section"
                  onSubmit={solicitudCambio}
                >
                  <div className="form-group ">
                    <p>
                      Introduzca su dirección de correo electrónico para recibir
                      instrucciones para restablecer la contraseña.
                    </p>
                    <label
                      htmlFor="signin-email"
                      className="control-label sr-only"
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="CorreoElectronico"
                      placeholder="Correo electrónico"
                      required
                      onChange={(e) => {
                        setSolicitud({
                          ...solicitud,
                          CorreoElectronico: e.target.value,
                        });
                      }}
                    />
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
                    Continuar
                  </button>
                  <div className="bottom">
                    <span>
                      ¿Ya posees una cuenta? <br />
                      <a className="mx-2" href="/login">
                        Inicia sesión aquí
                      </a>
                    </span>
                  </div>
                </form>

                {/* Tab 2 */}
                <form
                  className="form-auth-small tab ocultar"
                  onSubmit={restablecerCredenciales}
                  data-parsley-validate
                  data-parsley-focus="none"
                >
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
                      onChange={(e) => {
                        setCambio({ ...cambio, Contrasena: e.target.value });
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
                  <button
                    type="submit"
                    className="btn btn-warning btn-lg btn-block"
                  >
                    Continuar
                  </button>
                  <div className="bottom">
                    <span>
                      ¿Ya posees una cuenta? <br />
                      <a className="mx-2" href="/login">
                        Inicia sesión aquí
                      </a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
