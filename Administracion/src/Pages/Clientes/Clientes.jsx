import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import Table from "../../Components/Table";
import axios from "axios";
import Swal from "sweetalert2";

export default function Clientes() {
  const titulo = "Clientes";
  const ruta = process.env.REACT_APP_RUTA_DEV;

  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    getClientes();
  }, []);

  async function getClientes() {
    const res = await axios.get(`${ruta}BuscarClientes`);
    setClientes(res.data);
  }

  function eliminarCliente(id, FotoPerfil) {
    Swal.fire({
      title: "Esta seguro de esta acción?",
      text: "Se va a perder esta información para siempre",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${ruta}EliminarCliente/${id}`, { data: [FotoPerfil] })
          .then(() => {
            Swal.fire({
              title: "Eliminado",
              text: "Se eliminó con éxito",
              icon: "success",
              timer: 1500,
            }).then(() => window.location.replace("/Clientes"));
          });
      }
    });
  }

  const Botones = (id, FotoPerfil) => {
    return (
      <>
        <a
          href={`/EditarCliente/${id}`}
          className="btn btn-primary btn-sm mx-1"
        >
          <i className="fa fa-edit"></i>
        </a>
        <button
          type="button"
          onClick={() => {
            eliminarCliente(id, FotoPerfil);
          }}
          className="btn btn-danger btn-sm mx-1"
        >
          <i className="fa fa-trash-o"></i>
        </button>
        <a href={`/Cliente/${id}`} className="btn btn-success btn-sm mx-1">
          <i className="fa fa-eye"></i>
        </a>
      </>
    );
  };

  const columnas = [
    "Nombre",
    "Apellidos",
    "Teléfono",
    "Correo Eletrónico",
    "Estado",
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
      <Navbar title={titulo} boton={true} url="/AgregarCliente" />
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="table-responsive">
              <Table
                titulo={"Clientes"}
                datos={clientes.map((cliente) => [
                  cliente.Nombre,
                  cliente.Apellidos,
                  cliente.Telefono,
                  cliente.CorreoElectronico,
                  cliente.estado ? "Activa" : "Desactivada",
                  Botones(cliente._id, cliente.FotoPerfil),
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
