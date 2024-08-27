import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import ModalEliminar from "../../Components/ModalEliminar";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../../Components/Table";

export default function Pedidos() {
  const titulo = "Pedidos";
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    getPedidos();
  }, []);

  async function getPedidos() {
    const res = await axios.get(`${ruta}Pedidos/ObtenerPedidos`);
    setPedidos(res.data);
  }

  // function eliminarPedido(id) {
  //   Swal.fire({
  //     title: "Esta seguro de esta acción?",
  //     text: "Se va a perder esta información para siempre",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Eliminar",
  //     cancelButtonText: "Cancelar",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios.delete(`${ruta}CambiarRuta${id}`).then(() => {
  //         Swal.fire({
  //           title: "Eliminado",
  //           text: "Se eliminó con éxito",
  //           icon: "success",
  //           timer: 1500,
  //         }).then(() => window.location.replace("/Pedidos"));
  //       });
  //     }
  //   });
  // }

  const Botones = (id) => {
    return (
      <>
        <a href={`/EditarPedido/${id}`} className="btn btn-primary btn-sm mx-1">
          <i className="fa fa-edit"></i>
        </a>
        {/* <button
          type="button"
          onClick={() => {
            eliminarCliente(id);
          }}
          className="btn btn-danger btn-sm mx-1"
        >
          <i className="fa fa-trash-o"></i>
        </button> */}
        <a href={`/Pedido/${id}`} className="btn btn-success btn-sm mx-1">
          <i className="fa fa-eye"></i>
        </a>
      </>
    );
  };

  const columnas = [
    "Cliente",
    "Estado",
    "Medio de pago",
    "Realizado",
    {
      name: "Acciones",
      options: {
        filter: false,
        print: false,
        download: false,
      },
    },
  ];
  return (
    <Layout title={titulo}>
      <Navbar title={titulo} boton={true} url="/AgregarPedido" />
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="table-responsive">
              <Table
                titulo={"Pedidos"}
                datos={pedidos.map((pedido) => [
                  pedido.Contacto.nombre + " " + pedido.Contacto.apellidos,
                  pedido.Estado,
                  pedido.MedioPago,
                  new Date(pedido.createdAt).toLocaleDateString("es"),
                  Botones(pedido._id),
                ])}
                columnas={columnas}
              />

              {/* <table className="table table-hover mb-0 c_table table-data">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cliente</th>
                    <th>Dirección del cliente</th>
                    <th>Estado del pedido</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="ml-2">Miel Pura 100kg</span>
                    </td>
                    <td>
                      <span className="ml-2">₡4.500</span>
                    </td>
                    <td>
                      <span className="ml-2">Jonh Smith</span>
                    </td>
                    <td>
                      <span className="ml-2">
                        Costado este del Mall San Pedro
                      </span>
                    </td>
                    <td>
                      <span className="ml-2">En progreso</span>
                    </td>
                    <td>
                      <a
                        href="/EditarPedido"
                        className="btn btn-primary btn-sm mx-1"
                      >
                        <i className="fa fa-edit"></i>
                      </a>
                      <button
                        data-toggle="modal"
                        data-target="#eliminar"
                        type="button"
                        className="btn btn-danger btn-sm mx-1"
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                      <a href="/Pedido" className="btn btn-success btn-sm mx-1">
                        <i className="fa fa-eye"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </div>
      <ModalEliminar item={"pedido"} />
    </Layout>
  );
}
