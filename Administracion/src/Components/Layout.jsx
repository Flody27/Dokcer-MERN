/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Layout({ children, title }) {
  window.document.title = `Tienda de Pao - ${title}`;

  let token = localStorage.getItem("token");
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!token && !usuario) {
    window.location = "/InicioSesion";
  }

  if (
    usuario.rol === "Cliente" &&
    usuario.rol !== "Empleado" &&
    usuario.rol !== "Admin"
  ) {
    window.location = "/Denegado";
  }

  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location = "/InicioSesion";
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar custom-navbar navbar-expand-lg py-2">
        <div className="container-fluid px-0">
          <a href="#" className="menu_toggle">
            <i className="fa fa-align-left"></i>
          </a>
          <a href="/" className="navbar-brand">
            <strong>Tienda</strong> Pao
          </a>
          <div id="navbar_main">
            <ul className="navbar-nav mr-auto hidden-xs">
              <li className="nav-item page-header">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">
                      <i className="fa fa-home"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item active">{title}</li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link nav-link-icon"
                  href="#"
                  id="navbar_1_dropdown_3"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <h6 className="dropdown-header">Menu de usuario</h6>
                  <a className="dropdown-item" href="#" onClick={cerrarSesion}>
                    <i className="fa fa-sign-out text-primary"></i>Cerrar Sesion
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="main_content" id="main-content">
        {/* Sidebar */}
        <div className="left_sidebar">
          <nav className="sidebar">
            {/* User Info */}
            <div className="user-info">
              <div className="image">
                <a href="#">
                  <img src="/assets/images/logo.png" alt="User" />
                </a>
              </div>
              <div className="detail mt-3">
                <h5 className="mb-3">{usuario.Nombre}</h5>
                {/* <small>Admin</small> */}
              </div>
            </div>
            <ul id="main-menu" className="metismenu">
              <li className={title === "Panel de control" ? "active" : ""}>
                <a href="/">
                  <i className="ti-home"></i>
                  <span>Panel de control</span>
                </a>
              </li>
              <li
                className={
                  title === "Clientes" || title === "Empleados" ? "active" : ""
                }
              >
                <a href="#" className="has-arrow">
                  <i className="ti-user"></i>
                  <span>Usuarios</span>
                </a>
                <ul>
                  <li>
                    <a href="/Clientes">Clientes</a>
                  </li>
                  <li>
                    <a href="/Empleados">Empleados</a>
                  </li>
                </ul>
              </li>
              <li className={title === "Pagos" ? "active" : ""}>
                <a href="/Pagos">
                  <i className="ti-money"></i>
                  <span>Pagos</span>
                </a>
              </li>
              <li className={title === "Pedidos" ? "active" : ""}>
                <a href="/Pedidos">
                  <i className="ti-truck"></i>
                  <span>Pedidos</span>
                </a>
              </li>
              <li className={title === "Productos" ? "active" : ""}>
                <a href="/Productos">
                  <i className="ti-package"></i>
                  <span>Productos</span>
                </a>
              </li>
              <li className={title === "Categorías" ? "active" : ""}>
                <a href="/Categorias">
                  <i className="ti-folder"></i>
                  <span>Categorías</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="page">{children}</div>
      </div>
    </>
  );
}
