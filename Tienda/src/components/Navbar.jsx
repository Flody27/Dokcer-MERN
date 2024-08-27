import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import { UseCarrito } from "../Context/CarritoContext";
import Swal from "sweetalert2";

const Navbar = ({ title = "" }) => {
  const carrito = UseCarrito();
  window.document.title = `La Miel de Pao | ${title}`;
  let token = localStorage.getItem("token");

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(JSON.parse(localStorage.getItem("Carrito")));
  }, [carrito.cantidadProd]);


  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location = "/";
    carrito.limpiarCarrito();
  }

  useEffect(() => {
    carrito.calcularPrecioFinal();
    carrito.cantidadProductos();
  }, []);

  function eliminar(id) {
    Swal.fire({
      title: "Elimar producto del carrito",
      text: "Este producto se va a elimar de tu carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si quiero eliminarlo",
    }).then((res) => {
      if (res.isConfirmed) {
        carrito.eliminar(id);
        window.location.reload();
      }
    });
  }

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenCarrito, setIsOpenCarrito] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const toggleCarrito = () => {
    setIsOpenCarrito(!isOpenCarrito);
  };

  useEffect(() => {
    if (isOpenMenu || isOpenCarrito) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpenMenu, isOpenCarrito]);

  function finalizarCompra() {
    if (!token) {
      return Swal.fire({
        title: "Necesita autenticarse",
        text: "Para realizar esta acción es necesario iniciar sesión o registrarse.",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
        confirmButtonColor: "#e4be02",
        denyButtonText: `Registrarse`,
        denyButtonColor: "#222",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location = "/login";
        } else if (result.isDenied) {
          window.location = "/registrarse";
        }
      });
    }
    window.location = "/checkout";
  }

  return (
    <>
      <header className="header-section header-responsive">
        <div className="header-top">
          <div className="container">
            <div className="ht-left">
              <div className="mail-service">
                <i className="fa fa-envelope"></i>
                lamieldepao28@gmail.com
              </div>
              <div className="phone-service">
                <i className=" fa fa-phone"></i>
                +506 6028-2364
              </div>
            </div>
            <div className="ht-right">
              {!token ? (
                <>
                  <div className="login-panel">
                    <a href="/registrarse" className="authentication-btn">
                      <i className="fa fa-user"></i>Registrarse
                    </a>{" "}
                    o
                    <a href="/login" className="authentication-btn">
                      <i className="fa fa-user"></i>Iniciar sesion
                    </a>
                  </div>
                </>
              ) : (
                <a href="#" onClick={cerrarSesion} className="login-panel">
                  <i className="fa  fa-sign-out"></i>Cerra sesion
                </a>
              )}
              {/* <div className="lan-selector">
                <select
                  className="language_drop"
                  name="countries"
                  id="countries"
                  style={{ width: "300px" }}
                >
                  <option
                    value="sp"
                    data-image="/assets/img/flag-cr2.jpg"
                    data-imagecss="flag yu"
                    data-title="Español"
                  >
                    Español
                  </option>
                  <option
                    value="yt"
                    data-image="/assets/img/flag-1.jpg"
                    data-imagecss="flag yt"
                    data-title="English"
                  >
                    English
                  </option>
                </select>
              </div> */}
              <div className="top-social">
                <Link to="https://www.facebook.com/lamieldepaocostarica/?locale=es_LA">
                  <i className="ti-facebook"></i>
                </Link>
                <Link to="https://www.instagram.com/lamieldepaocostarica/">
                  <i className="ti-instagram"></i>
                </Link>
                <Link to="https://wa.me/50660282364">
                  <i className="fa fa-whatsapp"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container header-page menu">
        <div className="inner-header">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="logo">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "70px", marginRight: "15px" }}
                />
                <a
                  href="/"
                  style={{
                    fontStyle: "normal",
                    display: "inline",
                    fontSize: "28px",
                  }}
                >
                  La Miel de Pao
                </a>
              </div>
            </div>
            <div className="col-lg-5 col-md-5">
              {/* <div className="advanced-search">
                  <div className="input-group">
                    <input type="text" placeholder="¿Qué deseas buscar?" />
                    <button type="button">
                      <i className="ti-search"></i>
                    </button>
                  </div>
                </div> */}
            </div>
            <div className="col-lg-3 text-right col-md-3">
              <ul className="nav-right">
                {/* <li className="heart-icon">
                  <a href="#">
                    <i className="icon_heart_alt"></i>
                    <span>4</span>
                  </a>
                </li> */}
                <li className="cart-icon">
                  <a href="#">
                    <i className="icon_bag_alt"></i>
                    <span>{carrito.cantidadProd}</span>
                  </a>
                  <div className="cart-hover">
                    <div className="select-items carrito-nav">
                      {carrito.cantidadProd === 0 ? (
                        <p className="text-center">
                          No se han agregado productos al carrito
                        </p>
                      ) : (
                        <table>
                          <tbody>
                            {productos
                              ? productos.map((item) => {
                                  return (
                                    <tr>
                                      <td className="si-pic">
                                        <img
                                          src={item.imagen}
                                          alt={item.nombre}
                                          width="100px"
                                        />
                                      </td>
                                      <td className="si-text">
                                        <div className="product-selected">
                                          <p>
                                            ₡{item.precio} x {item.cantidad}
                                          </p>
                                          <h6>{item.nombre}</h6>
                                        </div>
                                      </td>
                                      <td className="si-close">
                                        <button
                                          className="carrito-nav-btn"
                                          type="button"
                                          onClick={() => eliminar(item.id)}
                                        >
                                          <i className="ti-close"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                              : ""}
                          </tbody>
                        </table>
                      )}
                    </div>
                    <div className="select-total">
                      <span>total:</span>
                      <h5>¢{carrito.precioFinal.toLocaleString("es")}</h5>
                    </div>
                    <div className="select-button">
                      {carrito.cantidadProd === 0 ? (
                        ""
                      ) : (
                        <>
                          {" "}
                          <a href="/carrito" className="primary-btn view-card">
                            Ver carrito
                          </a>
                          <a
                            href="#"
                            onClick={finalizarCompra}
                            className="primary-btn checkout-btn"
                          >
                            FINALIZAR COMPRA
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </li>
                <li className="cart-price">
                  ¢{carrito.precioFinal.toLocaleString("es")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-item sticky-top menu">
        <div className="container">
          <nav className="nav-menu d-flex justify-content-center">
            <ul>
              <li className={title === "Inicio" ? "active" : ""}>
                <a href="/">Tienda</a>
              </li>
              <li className={title === "Productos" ? "active" : ""}>
                <a href="/productos">Productos</a>
              </li>
              <li className={title === "Carrito" ? "active" : ""}>
                <a href="/carrito">Carrito</a>
              </li>

              {!token ? (
                ""
              ) : (
                <li className={title === "Perfil" ? "active" : ""}>
                  <a href="/perfil">Perfil</a>
                </li>
              )}

              {!token ? (
                ""
              ) : (
                <li className={title === "Pedidos" ? "active" : ""}>
                  <a href="/pedidos">Pedidos</a>
                </li>
              )}

              {/* <li className={title === "Contacto" ? "active" : ""}>
                <a href="/contacto">Contacto</a>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>

      {/*  Header responsive*/}
      <nav className="navbar navbar-expand-md sticky-top menu-responsive">
        <div className="container">
          <button
            className="btn-transparante"
            type="button"
            id="MenuSidebar"
            onClick={toggleMenu}
          >
            <i className="fa fa-bars"></i>
          </button>
          <a href="/" className="navbar-brand mx-auto">
            La Miel de Pao
          </a>
          <button
            className="btn-transparante"
            type="button"
            onClick={toggleCarrito}
          >
            <i className="icon_bag_alt"></i>
          </button>
        </div>
      </nav>

      {/* Menu responsive */}
      <div
        id="mySidenav"
        className={`sidenav ${isOpenMenu ? "open" : ""}`}
        style={{ width: isOpenMenu ? "" : "0" }}
      >
        <div className="menu-header">
          <span className="menu-title">Menu</span>
          <button className="closebtn" onClick={toggleMenu}>
            &times;
          </button>
        </div>
        <a href="/">Inicio</a>
        <a href="/productos">Productos</a>
        <a href="/carrito">Carrito</a>

        {!token ? (
          ""
        ) : (
          <>
            <a href="/perfil">Perfil</a>
            <a href="/pedidos">Pedidos</a>
          </>
        )}
        {token ? (
          <a href="#" onClick={cerrarSesion}>
            Cerrar sesion
          </a>
        ) : (
          <>
            {" "}
            <a href="/login">Iniciar sesion</a>
            <a href="/registrarse">Registrate</a>
          </>
        )}
      </div>

      {/* Carrito responsive */}
      <div
        id="mySidenavCarrito"
        className={`side-carrito ${isOpenCarrito ? "open" : ""}`}
        style={{ width: isOpenCarrito ? "" : "0" }}
      >
        <div className="menu-header">
          <span className="menu-title">Carrito</span>
          <button className="closebtn" onClick={toggleCarrito}>
            &times;
          </button>
        </div>
        <div className="carrito-content">
          {carrito.cantidadProd === 0 ? (
            <p className="">No se han agregado productos al carrito</p>
          ) : productos ? (
            <>
              <table>
                <tbody>
                  {productos
                    ? productos.map((item) => (
                        <tr>
                          <td className="si-pic">
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              width="100px"
                            />
                          </td>
                          <td className="si-text">
                            <div className="product-selected">
                              <h6>{item.nombre}</h6>
                              <p>
                                ₡{item.precio} x {item.cantidad}
                              </p>
                            </div>
                          </td>
                          <td className="si-close">
                            <button
                              className="carrito-nav-btn"
                              type="button"
                              onClick={() => eliminar(item.id)}
                            >
                              <i className="ti-close"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="container bottom-carrito">
          <hr />
          <div className="row">
            <div className="col-6">
              <b className="Titulo-Precio">Total:</b>
            </div>
            <div className="col-6 ">
              <p className="Precio">
                ¢{carrito.precioFinal.toLocaleString("es")}
              </p>
            </div>
            <div className="col-lg-12">
              <a
                href="/carrito"
                className="btn btn-warning btn-block btn-ver-carrito"
              >
                Ver carrito
              </a>
              <a
                href="#"
                className="btn btn-warning btn-block btn-comprar-carrito"
                onClick={finalizarCompra}
              >
                Finalizar compra
              </a>
            </div>
          </div>
        </div>
      </div>

      {isOpenMenu && (
        <div
          className="overlay"
          style={{ display: isOpenMenu ? "block" : "none" }}
          onClick={toggleMenu}
        ></div>
      )}

      {isOpenCarrito && (
        <div
          className="overlay"
          style={{ display: isOpenCarrito ? "block" : "none" }}
          onClick={toggleCarrito}
        ></div>
      )}
    </>
  );
};

export default Navbar;
