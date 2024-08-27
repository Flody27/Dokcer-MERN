import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function InfoPedido() {
  const titulo = "Infromacion Pedido";
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const params = useParams();
  const [pedido, setPedido] = useState({
    Usuario: "",
    Identificacion: "",
    Productos: [
      {
        nombre: "",
        imagen: "",
        precio: "",
        cantidad: "",
        id: "",
      },
    ],
    MedioPago: "",
    NumeroFactura: "",
    Estado: "",
    CostoTotal: 0,
    Contacto: {
      nombre: "",
      apellidos: "",
      telefono: 0,
      correo: "",
      direccion1: "",
      direccion2: "",
      ciudad: "",
      provincia: "",
      codigo: "",
    },
  });

  useEffect(() => {
    if (params.id) obtenerPedido();
  }, []);

  async function obtenerPedido() {
    const res = await axios.get(`${ruta}Pedidos/ObtenerPedido/${params.id}`);
    setPedido(res.data.pedido);
  }

  return (
    <Layout title={titulo}>
      <Navbar title={titulo} />
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="body row">
                <div className="col-lg-4">
                  <b>Nombre</b>
                  <div className="form-group mb-3">
                    {pedido.Contacto.nombre}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Apellidos</b>
                  <div className="form-group mb-3">
                    {pedido.Contacto.apellidos}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Identificación</b>
                  <div className="form-group mb-3">{pedido.Identificacion}</div>
                </div>

                <div className="col-lg-4">
                  <b>Correo electronico</b>
                  <div className="form-group mb-3">
                    {pedido.Contacto?.correo}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Teléfono</b>
                  <div className="form-group mb-3">
                    {pedido.Contacto?.telefono}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Estado del pedido</b>
                  <div className="form-group mb-3">{pedido.Estado}</div>
                </div>

                <div className="col-lg-12">
                  <b>Producto(s)</b>
                  <div className="row p-2">
                    {pedido.Productos.map((prod) => (
                      <div class="card m-3 item">
                        <div class="row g-0">
                          <div class="col" style={{ width: 140 }}>
                            <img
                              src={prod.imagen}
                              class="img-fluid rounded-start"
                              alt="producto"
                            />
                          </div>
                          <div class="col" style={{ width: 200 }}>
                            <div class="card-body">
                              <p class="card-text">{prod.nombre}</p>
                              <p class="card-text">
                                <strong>Cantidad:</strong> {prod.cantidad}
                              </p>
                              <p className="card-text ">
                                Total:{" "}
                                <strong>
                                  ¢
                                  {parseInt(
                                    prod.precio * prod.cantidad
                                  ).toLocaleString("es")}
                                </strong>
                              </p>
                              <a
                                className="btn btn-warning btn-sm"
                                href={`/Producto/${prod.id}`}
                              >
                                Ver producto
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Medio de pago</b>
                  <div className="form-group mb-3">{pedido.MedioPago}</div>
                </div>

                <div className="col-lg-4">
                  <b>Factura</b>
                  <div className="form-group mb-3">{pedido.NumeroFactura}</div>
                </div>

                <div className="col-lg-4">
                  <b>Costo total</b>
                  <div className="form-group mb-3">{pedido.CostoTotal}</div>
                </div>

                <div className="col-lg-4">
                  <b>Dirección del cliente</b>
                  <div className="form-group mb-3">
                    {pedido.Contacto.direccion1}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Dirección alternativa</b>
                  <div className="form-group mb-3">
                    {pedido.Contacto.direccion2}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Ciudad</b>
                  <div className="form-group mb-3">
                    {pedido.Contacto.ciudad}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Provincia</b>
                  <div className="form-group mb-3">
                    {pedido.Contacto.provincia}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Codigo postal</b>
                  <div className="form-group mb-3">
                    {pedido.Contacto.codigo}
                  </div>
                </div>
                <div className="col-lg-4">
                  <b>Realizado</b>
                  <div className="form-group mb-3">
                    {new Date(pedido.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="col-lg-12">
                  <a
                    href={`/Cliente/${pedido.Usuario}`}
                    className="btn btn-success btn-block"
                  >
                    Detalles cliente
                  </a>
                </div>
                <div className="col-lg-12 my-3">
                  <button
                    type="button"
                    className="btn btn-warning btn-block"
                    onClick={() => {
                      window.location.replace("/Pedidos");
                    }}
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
