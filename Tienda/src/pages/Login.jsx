import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  window.document.title = "La Miel de Pao | Iniciar sesión";

  const handleRegistration = ({ CorreoElectronico, Contrasena }) => {
    const ruta = process.env.REACT_APP_RUTA_DEV + "IniciarSesion";
    axios
      .post(ruta, {
        CorreoElectronico: CorreoElectronico,
        Contrasena: Contrasena,
      })
      .then((resp) => {
        if (
          resp.data.usuario.rol === "Empleado" ||
          resp.data.usuario.rol === "Admin"
        ) {
          return Swal.fire({
            icon: "error",
            title: "Esta cuenta no está permitida iniciar sesión en la tienda",
            timer: 2500,
          }).then(() => {
            window.location.reload();
          });
        }

        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("usuario", JSON.stringify(resp.data.usuario));
        Swal.fire({
          icon: "success",
          title: "Ha iniciado sesión correctamente",
          timer: 2500,
        });
        setTimeout(() => {
          window.location = "/";
        }, 2500);
      })
      .catch((error) => {
        const mensaje = error.response.data.msg;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: mensaje,
        });
      });
  };

  const handleError = (errores) => {
    var mensajeError = "";

    if (errores.CorreoElectronico) {
      mensajeError = errores.CorreoElectronico.message + "\n <br />";
    }

    if (errores.Contrasena) {
      mensajeError = mensajeError.concat(errores.Contrasena.message);
    }

    console.log(mensajeError);

    Swal.fire({
      icon: "error",
      title: "Error en los campos del formulario",
      html: mensajeError,
    });
  };

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
                <p className="lead">Iniciar sesión</p>
              </div>
              <div className="body">
                <form
                  className="form-auth-small"
                  action="/"
                  data-parsley-validate
                  data-parsley-focus="none"
                  onSubmit={handleSubmit(handleRegistration, handleError)}
                >
                  <div className="form-group">
                    <label
                      htmlFor="signin-email"
                      className="control-label sr-only"
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="signin-email"
                      placeholder="Correo electrónico"
                      {...register("CorreoElectronico", {
                        required: "El campo correo electrónico es obligatorio",
                        minLength: {
                          value: 8,
                          message:
                            "El correo electrónico debe contener al menos 8 carácteres",
                        },
                        maxLength: {
                          value: 254,
                          message:
                            "El correo electrónico debe contener hasta 254 carácteres",
                        },
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="signin-password"
                      className="control-label sr-only"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="signin-password"
                      placeholder="Contraseña"
                      {...register("Contrasena", {
                        required: "El campo contraseña es obligatorio",
                        minLength: {
                          value: 8,
                          message:
                            "La contraseña debe contener al menos 8 carácteres",
                        },
                        maxLength: {
                          value: 254,
                          message:
                            "La contraseña debe contener hasta 254 carácteres",
                        },
                      })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-warning btn-lg btn-block"
                  >
                    Iniciar sesión
                  </button>
                  <div className="bottom">
                    <span className="helper-text m-b-10">
                      <i className="fa fa-lock mx-2"></i>
                      <a href="/restablecercontraseña">
                        Restablecer contraseña
                      </a>
                    </span>
                    <span>
                      Crear cuenta
                      <a className="mx-2" href="/registrarse">
                        Registarse
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
