export default function Navbar({ title, boton = false, url = "" }) {
  function BotonAgregar() {
    return (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav mr-auto" />
        <div className="my-2 my-lg-0">
          <a className="btn btn-primary" href={url}>
            Agregar
          </a>
        </div>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div className="toggle-menu">
        <i id="closeMenu" className="ti-angle-down toggle-icons"></i>
        <i id="openMenu" className=" ti-angle-right toggle-icons"></i>
      </div>
      <b className="navbar-brand">{title}</b>
      {/* Responsive menu */}
      {boton ? (
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-align-justify"></i>
        </button>
      ) : (
        ""
      )}

      {boton ? <BotonAgregar /> : ""}
    </nav>
  );
}
