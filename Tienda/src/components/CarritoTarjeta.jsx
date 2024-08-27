import React, { useEffect, useState } from "react";
import { UseCarrito } from "../Context/CarritoContext";
import Swal from "sweetalert2";

const CarritoTarjeta = ({ producto }) => {
  const [precioTotal, setPrecioTotal] = useState(0);
  const [cantidadProd, setCantidadProd] = useState(producto.cantidad);

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
    if (producto.cantidad > producto.MaxCantidad) {
      setCantidadProd(producto.MaxCantidad);
      Swal.fire({
        icon: "warning",
        title: `No hay la cantidad solicitada de ${producto.nombre} se asigno la cantidad disponible.`,
      });

      carrito.eliminar(producto.id);
      return;
    }

    if (producto.MaxCantidad === 0) {
      setCantidadProd(producto.MaxCantidad);
      Swal.fire({
        icon: "warning",
        title: `No hay unidades disponibles de ${producto.nombre}.`,
      });
      carrito.eliminar(producto.id);
      return;
    }
  }, [producto]);

  useEffect(() => {
    setPrecioTotal(parseInt(producto.precio * cantidadProd));
    carrito.actualizarCantidad(producto.id, cantidadProd);
    carrito.calcularPrecioFinal();
    carrito.cantidadProductos();
  }, [aumentar, reducir]);

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

  function aumentar() {
    if (cantidadProd === producto.MaxCantidad) {
      Toast.fire({
        icon: "warning",
        title: "No quedan mas productos en bodega",
      });
      return;
    }
    setCantidadProd(parseInt(cantidadProd) + 1);
    setPrecioTotal(parseInt(producto.precio * cantidadProd));
  }

  function reducir() {
    if (parseInt(cantidadProd) === 1) {
      return;
    }

    setCantidadProd(parseInt(cantidadProd) - 1);
    setPrecioTotal(parseInt(producto.precio * cantidadProd));
  }

  return (
    <>
      <div class="card mb-3 responsive-invisble" style={{ maxWidth: 640 }}>
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src={producto.imagen}
              class="img-fluid rounded-start"
              alt="producto"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-text">{producto.nombre}</p>
              <p className="card-text ">
                Costo: <strong>¢{precioTotal.toLocaleString("es")}</strong>
              </p>

              <div className="cantidad-producto">
                <button type="button" onClick={reducir}>
                  <i className="ti-minus"></i>
                </button>
                <input type="text" value={cantidadProd} readOnly />
                <button type="button" onClick={aumentar}>
                  <i className="ti-plus"></i>
                </button>
              </div>

              <button
                type="button"
                class="btn btn-outline-danger"
                id="Cantidad"
                onClick={() => eliminar(producto.id)}
              >
                <i className="ti-trash"></i> Eliminar producto del carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-3 responsive-show" style={{ maxWidth: 740 }}>
        <div class="row g-0">
          <div class="col-6">
            <img
              src={producto.imagen}
              class="img-fluid rounded-start"
              alt="producto"
              style={{ height: 200 }}
            />
            <button
              type="button"
              class="btn-eliminar"
              id="Cantidad"
              onClick={() => eliminar(producto.id)}
            >
              <i className="ti-close"></i>
            </button>
          </div>
          <div className="col-6">
            <p class="card-text">{producto.nombre}</p>
            <p className="card-text ">
              Costo: <strong>¢{precioTotal.toLocaleString("es")}</strong>
            </p>
            <div className="cantidad-producto">
              <button type="button" onClick={reducir}>
                <i className="ti-minus"></i>
              </button>
              <input type="text" value={cantidadProd} readOnly />
              <button type="button" onClick={aumentar}>
                <i className="ti-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarritoTarjeta;
