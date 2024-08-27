import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext({
  precioFinal: 0,
  cantidadProd: 0,
  agregar: (producto) => {},
  eliminar: (id) => {},
  cantidadProductos: () => {},
  actualizarCantidad: (id, cantidad) => {},
  calcularPrecioFinal: () => {},
  limpiarCarrito: () => {},
});

export default function Cart({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [precioFinal, setPrecioFinal] = useState(0);
  const [cantidadProd, setCantidadProd] = useState(0);
  let productos = JSON.parse(localStorage.getItem("Carrito"));

  useEffect(() => {
    productos ? setCarrito(productos) : setCarrito([]);
  }, []);

  function agregar(producto) {
    const existe = carrito.findIndex((item) => item.id === producto.id);
    if (existe >= 0) {
      const nuevoCarrito = structuredClone(carrito);
      nuevoCarrito[existe].cantidad +=
        producto.cantidad >= 1 ? producto.cantidad : 1;
      localStorage.setItem("Carrito", JSON.stringify(nuevoCarrito));
      return setCarrito(nuevoCarrito);
    }
    setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    localStorage.setItem(
      "Carrito",
      JSON.stringify([
        ...carrito,
        {
          ...producto,
          cantidad: producto.cantidad >= 1 ? producto.cantidad : 1,
        },
      ])
    );
  }

  function eliminar(id) {
    let items = JSON.parse(localStorage.getItem("Carrito"));
    let nuevoCarrito = items.filter((item) => item.id !== id);
    localStorage.setItem("Carrito", JSON.stringify(nuevoCarrito));
  }

  function limpiarCarrito() {
    setCarrito([]);
    localStorage.removeItem("Carrito");
  }

  function cantidadProductos() {
    if (productos !== undefined && productos !== null) {
      let total = 0;

      for (let index = 0; index < productos.length; index++) {
        total = parseInt(productos[index].cantidad + total);
      }

      return setCantidadProd(total);
    }
    return setCantidadProd(0);
  }

  function actualizarCantidad(id, cantidad) {
    let items = localStorage.getItem("Carrito");
    let data = [];

    if (items) {
      data = JSON.parse(items);
    }

    const existe = data.find((item) => item.id === id);
    if (existe) {
      existe["cantidad"] = cantidad;
    }
    localStorage.setItem("Carrito", JSON.stringify(data));
  }

  function calcularPrecioFinal() {
    let items = localStorage.getItem("Carrito");
    let data = [];

    if (items) {
      data = JSON.parse(items);
    } else {
      return setPrecioFinal(0);
    }

    let total = 0;
    for (let index = 0; index < data.length; index++) {
      total = parseInt(data[index].precio * data[index].cantidad + total);
    }

    return setPrecioFinal(total);
  }

  return (
    <AppContext.Provider
      value={{
        precioFinal,
        carrito,
        agregar,
        eliminar,
        cantidadProductos,
        actualizarCantidad,
        calcularPrecioFinal,
        limpiarCarrito,
        cantidadProd,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function UseCarrito() {
  return useContext(AppContext);
}
