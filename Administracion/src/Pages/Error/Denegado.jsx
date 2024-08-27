export default function Denegado() {
  window.document.title = "La Miel de Pao | Error 401";

  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location = "/InicioSesion";
  }

  return (
    <div id="wrapper">
      <div className="vertical-align-wrap">
        <div className="vertical-align-middle auth-main">
          <div className="auth-box">
            <div className="card">
              <div className="header">
                <h3 className="w-100 text-center">
                  <span className="clearfix title">
                    <span className="number left">401</span>
                    <span className="text">El acceso ha sido denegado</span>
                  </span>
                </h3>
              </div>
              <div className="body">
                <div className="margin-top-30 d-flex justify-content-center">
                  <img
                    src="/assets/images/AbejaEnojada.png"
                    alt="Abeja Enojada"
                    width="100px"
                    height="100px"
                  />
                </div>
                <div className="m-t-10 d-flex justify-content-center">
                  <a
                    className="btn btn-primary"
                    onClick={cerrarSesion}
                    href="#"
                  >
                    Inicia sesion
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
