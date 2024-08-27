import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PedidosTarjeta from "../components/PedidosTarjeta";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [rutaImagen, setRutaImagen] = useState("");
  const ruta = process.env.REACT_APP_RUTA_DEV;
  // const [productosString, setProductosString] = useState('')

  async function obtenerPedidos() {
    const usuario = JSON.parse(localStorage.getItem("usuario"))._id;

    await axios
      .get(
        `${
          process.env.REACT_APP_RUTA_DEV
        }Pedidos/ObtenerPedidosPorUsuario/${String(usuario)}`
      )
      .then((resp) => {
        const pedidos = resp.data.pedidos;

        pedidos.forEach((element) => {
          var nombreProductos = "";

          const productos = element.Productos;

          productos.forEach((element) => {
            setRutaImagen(element.imagen);
            // element.nombre = element.nombre +  " ,"
            // console.log(element.nombre);
          });

          console.log(nombreProductos);
          // console.log(productosString);
        });

        setPedidos(resp.data.pedidos);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // eslint-disable-next-line
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      window.location = "/";
      return;
    }

    obtenerPedidos();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <Navbar title="Pedidos" />

      {/* Main de la pagina */}
      <div className="container">
        <div className="container mt-4 mb-4 d-flex justify-content-center">
          <div className="flex-column">
            <h2 className="text-center">Mis Pedidos</h2>
          </div>
        </div>

        <div className="container">
          <div>
            {pedidos.length === 0 ? (
              <>
                <h4 className="text-center">No hay pedidos</h4>
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
              <div className="row">
                {pedidos !== undefined || pedidos !== null || pedidos != [] ? (
                  pedidos.map((pedido, index) => (
                    <PedidosTarjeta
                      key={pedido._id}
                      orden={(index += 1)}
                      productos={pedido.Productos.map(
                        (element, index, array) => {
                          if (array.length > 1 && index !== array.length - 1) {
                            return element.nombre + " ,";
                          }
                          return element.nombre;
                        }
                      )}
                      estado={pedido.Estado}
                      rutaImagen={`${ruta}${pedido.Imagen[0]}`}
                      costo={pedido.CostoTotal}
                      medioPago={pedido.MedioPago}
                    />
                  ))
                ) : (
                  <>
                    <h4 className="text-center my-4">
                      No tiene pedidos realizados
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
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Pedidos;
