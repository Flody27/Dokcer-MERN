import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../../Components/Table";

export default function Pagos() {
  const titulo = "Pagos";
  const ruta = process.env.REACT_APP_RUTA_DEV;

  const [pagos, setPagos] = useState([]);
  useEffect(() => {
    getPagos();
  }, []);

  async function getPagos() {
    const res = await axios.get(`${ruta}PagosPendientes`);
    setPagos(res.data);
  }

  function eliminarPago(id) {
    Swal.fire({
      title: "Esta seguro de esta accion?",
      text: "Se va a perder esta informacion para siempre",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${ruta}EliminarPagoPendiente/${id}`).then(() => {
          Swal.fire({
            title: "Eliminado",
            text: "Se elimino con exito",
            icon: "success",
            timer: 1500,
          }).then(() => window.location.replace("/Pagos"));
        });
      }
    });
  }

  const Botones = (id) => {
    return (
      <>
        <a href={`/EditarPago/${id}`} className="btn btn-primary btn-sm mx-1">
          <i className="fa fa-edit"></i>
        </a>
        <button
          type="button"
          onClick={() => {
            eliminarPago(id);
          }}
          className="btn btn-danger btn-sm mx-1"
        >
          <i className="fa fa-trash-o"></i>
        </button>
      </>
    );
  };

  const columnas = [
    "Pagado a",
    "Monto",
    "Estado",
    "Fecha limite",
    {
      name: "Acciones",
      options: {
        filter: false,
        print: false,
        download: false,
      },
    },
  ];

  const fecha = (fecha) => {
    let temp = new Date(fecha);
    let dia = temp.getDate() + 1;
    let mes = temp.getMonth() + 1;
    let year = temp.getFullYear();
    return `${dia}/${mes}/${year}`;
  };

  return (
    <Layout title={titulo}>
      <Navbar title={titulo} boton={true} url="/AgregarPago" />
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="table-responsive">
              <Table
                titulo={"Pagos"}
                datos={pagos.map((pago) => [
                  pago.Entidad,
                  pago.Monto,
                  pago.Estado,
                  fecha(pago.FechaLimite),
                  Botones(pago._id),
                ])}
                columnas={columnas}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
