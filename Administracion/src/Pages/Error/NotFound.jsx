export default function NotFound() {
  window.document.title = "La Miel de Pao | Error 404"
  return (
    <div id="wrapper">
      <div className="vertical-align-wrap">
        <div className="vertical-align-middle auth-main">
          <div className="auth-box">
            <div className="card">
              <div className="header">
                <h3 className="w-100 text-center">
                  <span className="clearfix title">
                    <span className="number left">404</span>
                    <span className="text">Oops! Pagina no econtrada</span>
                  </span>
                </h3>
              </div>
              <div className="body">
                <p>
                La página que se estaba buscando no se encontró
                </p>
                <div className="margin-top-30">
                  <a href="javascript:history.go(-1)" className="btn btn-default">
                    <i className="fa fa-arrow-left"></i> <span>Volver</span>
                  </a>
                  <a href="/" className="btn btn-primary">
                    <i className="fa fa-home"></i> <span>Inicio</span>
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
