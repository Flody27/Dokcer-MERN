import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

export default function SingUp() {
  window.document.title = "La Miel de Pao | Registro";
  const ruta = process.env.REACT_APP_RUTA_DEV + "Registrarse";
  const recaptcha = useRef();
  const [usuario, setUsuario] = useState({
    Nombre: "",
    Apellidos: "",
    CorreoElectronico: "",
    Contrasena: "",
  });

  const handleInputChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
      .post(ruta, usuario)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Cuenta creada con éxito",
          text: "Revisar el correo para confirmar la creación de la cuenta.",
          timer: 10000,
        }).then(() => {
          window.location.replace("/login");
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Error registrando usuario.",
          html: err.response.data.message,
          timer: 2500,
        });
      });
  };

  useEffect(() => {
    MostrarTab(0, true);
  }, []);

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

  function tabAnterior(anterior) {
    MostrarTab(anterior, true);
    MostrarTab(anterior + 1, false);
  }

  function validarTab(tab) {
    if (
      tab === 0 &&
      campoValido("Nombre") &&
      campoValido("Apellidos") &&
      campoValido("CorreoElectronico")
    ) {
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
                <p className="lead">Crea tu cuenta</p>
              </div>
              <div className="body">
                <form
                  className="form-auth-small form-valid"
                  action="/"
                  data-parsley-validate
                  data-parsley-focus="none"
                  onSubmit={handleSubmit}
                >
                  <div className="tab ocultar">
                    <div className="form-group">
                      <label htmlFor="Nombre" className="control-label sr-only">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Nombre"
                        name="Nombre"
                        placeholder="Nombre"
                        onChange={handleInputChange}
                        data-parsley-required-message="Campo nombre requerido"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="Apellidos"
                        className="control-label sr-only"
                      >
                        Apellidos
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Apellidos"
                        name="Apellidos"
                        placeholder="Apellidos"
                        onChange={handleInputChange}
                        data-parsley-required-message="Campo apellidos requerido"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="CorreoElectronico"
                        className="control-label sr-only"
                      >
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="CorreoElectronico"
                        name="CorreoElectronico"
                        placeholder="Correo electrónico"
                        onChange={handleInputChange}
                        data-parsley-type="email"
                        data-parsley-type-message="Formato de correo electrónico inválido"
                        data-parsley-required-message="Campo de correo electrónico requerido"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-warning btn-lg btn-block"
                      onClick={() => {
                        tabSiguiente(1);
                      }}
                    >
                      Continuar
                    </button>
                  </div>

                  <div className="tab ocultar">
                    <div className="form-group">
                      <label
                        htmlFor="Contraseña"
                        className="control-label sr-only"
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="Contrasena"
                        name="Contrasena"
                        placeholder="Contraseña"
                        onChange={handleInputChange}
                        data-parsley-required-message="Campo contraseña requerido"
                        data-parsley-pattern="/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/"
                        data-parsley-pattern-message="Formato de la contraseña incorrecto"
                        required
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
                      type="button"
                      className="btn btn-warning btn-lg btn-block"
                      onClick={() => {
                        tabSiguiente(2);
                      }}
                    >
                      Continuar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-lg btn-block"
                      onClick={() => {
                        tabAnterior(0);
                      }}
                    >
                      Regresar
                    </button>
                  </div>

                  <div className="tab ocultar">
                    <p>
                      <small>
                         Al crear su cuenta de usuario, revisé su correo
                        electrónico para activar su cuenta.
                      </small>
                    </p>
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
                      Crear cuenta
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-lg btn-block"
                      onClick={() => {
                        tabAnterior(1);
                      }}
                    >
                      Regresar
                    </button>
                  </div>

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
