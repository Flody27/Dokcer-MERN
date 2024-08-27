import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarritoTarjeta from "../components/CarritoTarjeta";
import { UseCarrito } from "../Context/CarritoContext";
import Swal from "sweetalert2";

const Carrito = () => {
  let token = localStorage.getItem("token");

  const carrito = UseCarrito();

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(JSON.parse(localStorage.getItem("Carrito")));
  }, [carrito.cantidadProd]);

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
      {/* NAVBAR */}
      <Navbar title="Carrito" />

      {/* Main de la pagina */}
      <div className="container">
        <div className="container mt-4 mb-4 d-flex justify-content-center">
          <div className="flex-column">
            <h2 className="text-center">Mi Carrito</h2>
          </div>
        </div>
        <div className="container carrito-container">
          {carrito.cantidadProd === 0 ? (
            <>
              <h4 className="text-center">
                No se han agregado productos al carrito
              </h4>
              <div className="margin-top-30 d-flex justify-content-center">
                <img
                  src="/assets/img/HappyBee.webp"
                  alt="Abeja Enojada"
                  height="200px"
                />
              </div>
              <div className="d-flex justify-content-center">
                <a className="primary-btn" href="/productos">
                  Revisa nuestro catálago de productos
                </a>
              </div>
            </>
          ) : (
            <div className="row mb-2">
              <div className="col-lg-7 carrito-divisor">
                {productos
                  ? productos.map((item) => {
                      return (
                        <>
                          <CarritoTarjeta producto={item} />
                        </>
                      );
                    })
                  : ""}
              </div>
              <div className="col-lg-5 responsive-invisble">
                <h5 className="text-center mb-2">Resumen de orden</h5>
                <div className="text-center">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <p>Precio final</p>
                        </div>
                        <div className="col-sm-6">
                          ¢{carrito.precioFinal.toLocaleString("es")}
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 m-2">
                      <a
                        href="#"
                        onClick={finalizarCompra}
                        className="btn btn-warning w-75"
                      >
                        Realizar Pago
                      </a>
                    </div>
                    <div className="col-lg-12 m-2">
                      <button
                        type="button"
                        onClick={() => {
                          carrito.limpiarCarrito();
                        }}
                        className="btn btn-danger w-75"
                      >
                        Vaciar carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          class="fixed-bottom info-carrito p-2 text-center responsive-show"
          // style={{ zIndex: 100 }}
        >
          <div className="text-center">
            <div className="row">
              <div className="col-6">
                <b className="Titulo-Precio">Total:</b>
              </div>
              <div className="col-6 ">
                <p className="Precio">
                  ¢{carrito.precioFinal.toLocaleString("es")}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <button
                  type="button"
                  onClick={() => {
                    carrito.limpiarCarrito();
                  }}
                  className="btn btn-danger"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
              <div className="col-10">
                <a
                  href="#"
                  onClick={finalizarCompra}
                  className="btn btn-warning btn-block"
                >
                  Realizar Pago
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="responsive-invisble">
        <Footer />
      </div>
    </>
  );
};

export default Carrito;
