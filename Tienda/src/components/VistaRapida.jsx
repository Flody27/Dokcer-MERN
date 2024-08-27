/* eslint-disable jsx-a11y/anchor-is-valid */
import Swal from "sweetalert2";
import { UseCarrito } from "../Context/CarritoContext";
import { useEffect, useState } from "react";
const VistaRapida = ({ producto }) => {
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const [precioTotal, setPrecioTotal] = useState(producto.Precio);
  const [cantidadProd, setCantidadProd] = useState(1);
  const carrito = UseCarrito();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    setPrecioTotal(parseInt(producto.Precio * cantidadProd));
  }, [aumentar, reducir]);

  function aumentar() {
    if (cantidadProd === producto.Cantidad) {
      Toast.fire({
        icon: "warning",
        title: "No quedan mas productos en bodega",
      });
      return;
    }
    setCantidadProd(parseInt(cantidadProd) + 1);
  }

  function reducir() {
    if (parseInt(cantidadProd) === 1) {
      return;
    }

    setCantidadProd(parseInt(cantidadProd) - 1);
  }

  function agregarCarrito() {
    carrito.agregar({
      id: producto._id,
      nombre: producto.Nombre,
      imagen: `${ruta}${producto.Imagen[0]}`,
      precio: producto.Precio,
      cantidad: cantidadProd,
      MaxCantidad: producto.Cantidad,
    });

    Toast.fire({
      icon: "success",
      title: "Producto agregado al carrito existosamente",
    });
  }

  return (
    <>
      <div
        className="modal fade"
        id={`vistaRapida${producto._id}`}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <div className="product-shop spad page-details Vista-rapida">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="product-pic-zoom">
                            <img
                              id="Imagen"
                              className="product-big-img"
                              alt=""
                              src={`${ruta}${producto.Imagen[0]}`}
                            />
                            {/* <div className="zoom-icon">
                              <i className="fa fa-search-plus" />
                            </div> */}
                          </div>
                          {/* <div className="product-thumbs">
                            <div className="product-thumbs-track ps-slider owl-carousel">
                              <div
                                className="pt active"
                                data-imgbigurl="/assets/img/Miel con chile-Carrousel.jpg"
                              >
                                <img
                                  src="/assets/img/Miel con chile-Carrousel.jpg"
                                  alt=""
                                />
                              </div>
                              <div
                                className="pt"
                                data-imgbigurl="/assets\img\Miel con limon-Carrousel.jpg"
                              >
                                <img
                                  src="/assets\img\Miel con limon-Carrousel.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div> */}
                        </div>
                        <div className="col-lg-6">
                          <div className="product-details">
                            <div className="pd-title">
                              <h3 id="ProdName">{producto.Nombre}</h3>
                              {/* <a href="#" className="heart-icon">
                        <i className="icon_heart_alt" />
                      </a> */}
                            </div>
                            <div className="pd-rating">
                              <i className="fa fa-star m-1" />
                              <i className="fa fa-star m-1" />
                              <i className="fa fa-star m-1" />
                              <i className="fa fa-star m-1" />
                              <i className="fa fa-star-o m-1" />
                              <span>(5)</span>
                            </div>
                            <div className="pd-desc">
                              <p id="ProdDesc">{producto.Descripcion}</p>
                              <h4 id="ProdPrecio">
                                ¢{precioTotal.toLocaleString("es")}
                              </h4>
                            </div>
                            <div className="cantidad-producto mb-2">
                              <button type="button" onClick={reducir}>
                                <i className="ti-minus"></i>
                              </button>
                              <input
                                type="text"
                                value={cantidadProd}
                                readOnly
                              />
                              <button type="button" onClick={aumentar}>
                                <i className="ti-plus"></i>
                              </button>
                            </div>
                            <a
                              href="#"
                              onClick={agregarCarrito}
                              className="primary-btn mb-3"
                            >
                              Agregar al carrito
                            </a>

                            <ul className="pd-tags">
                              <li>
                                <span>Categoria</span>: {producto.Categoria}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VistaRapida;
