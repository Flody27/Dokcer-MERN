/* eslint-disable no-sparse-arrays */
import Layout from "../Components/Layout";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";

export default function Index() {
  const titulo = "Panel de control";
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const [pagos, setPagos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    obtenerPagos();
    obtenerPedidos();
  }, []);

  async function obtenerPagos() {
    const res = await axios.get(`${ruta}ProximosPagos`);
    setPagos(res.data);
  }

  async function obtenerPedidos() {
    const res = await axios.get(`${ruta}Pedidos/ObtenerPedidos`);
    setPedidos(
      res.data.filter(
        (data) => data.Estado === "En Proceso" || data.Estado === "Pendiente"
      )
    );
  }

  const columnas = ["Pagado a", "Monto", "Estado", "Fecha limite"];

  const options = {
    viewColumns: false,
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    textLabels: {
      body: {
        noMatch: "No se encontraron datos",
        toolTip: "Filtrar",
        columnHeaderTooltip: (column) => `Filtrar por ${column.label}`,
      },
      pagination: {
        next: "Página siguiente",
        previous: "Página anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
      },
      filter: {
        all: "Todo",
        title: "Filtros",
        reset: "Reiniciar",
      },
      selectedRows: {
        text: "Filas(s) seleccionadas",
        delete: "Eliminar",
        deleteAria: "Eliminar las filas seleccionadas",
      },
    },
    download: false,
    print: false,
    filter: false,
  };

  const fecha = (fecha) => {
    let temp = new Date(fecha);
    let dia = temp.getDate() + 1;
    let mes = temp.getMonth() + 1;
    let year = temp.getFullYear();
    return `${dia}/${mes}/${year}`;
  };

  return (
    <Layout title={titulo}>
      <Navbar title={titulo} />
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-sm-12">
            <div className="card">
              <div className="header">
                <h2>Pedidos Pendientes</h2>
              </div>
              <div className="body">
                <div className="table-responsive">
                  {/* <table className="table table-hover c_table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cliente</th>
                        <th>Metodo de pago</th>
                        <th>Entrega</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Miel pura 100kg</td>
                        <td>Diego Andres valle</td>
                        <td>Transferencia</td>
                        <td>Envio por correo</td>
                        <td>
                          <a href="#" className="btn btn-warning">
                            {" "}
                            ver pedido
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table> */}

                  <MUIDataTable
                    title={"Pedidos en proceso y pendientes"}
                    columns={[
                      "Cliente",
                      "Estado",
                      "Medio",
                      "Monto",
                      "Realizado",
                      {
                        name: "Ver mas",
                        options: {
                          sort: false,
                        },
                      },
                      ,
                    ]}
                    options={options}
                    data={pedidos.map((pedido) => [
                      pedido.Contacto.nombre + " " + pedido.Contacto.apellidos,
                      pedido.Estado,
                      pedido.MedioPago,
                      pedido.CostoTotal,
                      new Date(pedido.createdAt).toLocaleDateString("es"),
                      <a
                        href={`/Pedido/${pedido._id}`}
                        className="btn btn-success mx-1"
                      >
                        <i className="fa fa-eye"></i> ver mas
                      </a>,
                    ])}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="card">
              <div className="body">
                <div className="table-responsive">
                  <MUIDataTable
                    title={"Pagos por hacer"}
                    columns={columnas}
                    options={options}
                    data={pagos.map((pago) => [
                      pago.Entidad,
                      pago.Monto,
                      pago.Estado,
                      fecha(pago.FechaLimite),
                    ])}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
