import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = ({ CorreoElectronico, Contrasena }) => {
    const ruta = process.env.REACT_APP_RUTA_DEV + "IniciarSesion";
    axios
      .post(ruta, {
        CorreoElectronico: CorreoElectronico,
        Contrasena: Contrasena,
      })
      .then((resp) => {
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
          title: "Error al iniciar sesion",
          html: mensaje,
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
              <div className="header">
                <p className="lead">Iniciar sesion</p>
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
                      Correo electronico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="signin-email"
                      placeholder="Correo electronico"
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
                    Iniciar sesion
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
