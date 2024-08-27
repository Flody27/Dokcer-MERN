/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { UseCarrito } from "../Context/CarritoContext";
import VistaRapida from "./VistaRapida";

const ProductosTarjeta = ({ producto }) => {
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const carrito = UseCarrito();

  useEffect(() => {
    carrito.calcularPrecioFinal();
    carrito.cantidadProductos();
  }, [agregarCarrito]);

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

  function agregarCarrito() {
    carrito.agregar({
      id: producto._id,
      nombre: producto.Nombre,
      imagen: `${ruta}${producto.Imagen[0]}`,
      precio: producto.Precio,
      MaxCantidad: producto.Cantidad,
    });

    Toast.fire({
      icon: "success",
      title: "Producto agregado al carrito existosamente",
    });
  }

  return (
    <div className="col-lg-4 col-sm-6">
      <div className="product-item">
        <div className="pi-pic">
          <img
            height="300px"
            src={`${ruta}${producto.Imagen[0]}`}
            alt={producto.Nombre}
          />
          {/* <div className="sale pp-sale">Descuento</div> */}
          {/* <div className="icon">
            <i className="icon_heart_alt"></i>
          </div> */}
          <ul>
            <li className="w-icon active">
              <button onClick={agregarCarrito}>
                <i className="icon_bag_alt"></i>
              </button>
            </li>
            <li className="quick-view">
              <a
                href="#"
                data-toggle="modal"
                data-target={`#vistaRapida${producto._id}`}
              >
                Vista rapida
              </a>
            </li>
          </ul>
        </div>
        <div className="pi-text">
          <div class="catagory-name">{producto.Categoria}</div>
          <a className="nombre-producto" href={`/producto/${producto._id}`}>
            <p>{producto.Nombre}</p>
          </a>
          <div className="product-price">
            ¢{producto.Precio.toLocaleString("es")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosTarjeta;
