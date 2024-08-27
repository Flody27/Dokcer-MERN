import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import Table from "../../Components/Table";
import axios from "axios";
import Swal from "sweetalert2";

export default function Empleados() {
  const titulo = "Empleados";
  const ruta = process.env.REACT_APP_RUTA_DEV;

  const [empleados, setEmpleados] = useState([]);
  useEffect(() => {
    getEmpleados();
  }, []);

  async function getEmpleados() {
    const res = await axios.get(`${ruta}BuscarEmpleados`);
    setEmpleados(res.data);
  }

  function eliminarEmpleado(id) {
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
        axios.delete(`${ruta}EliminarEmpleado/${id}`).then(() => {
          Swal.fire({
            title: "Eliminado",
            text: "Se eliminó con éxito",
            icon: "success",
            timer: 1500,
          }).then(() => window.location.replace("/Empleados"));
        });
      }
    });
  }

  const Botones = (id) => {
    return (
      <>
        <a
          href={`/EditarEmpleado/${id}`}
          className="btn btn-primary btn-sm mx-1"
        >
          <i className="fa fa-edit"></i>
        </a>
        <button
          type="button"
          onClick={() => {
            eliminarEmpleado(id);
          }}
          className="btn btn-danger btn-sm mx-1"
        >
          <i className="fa fa-trash-o"></i>
        </button>
        <a href={`/Empleado/${id}`} className="btn btn-success btn-sm mx-1">
          <i className="fa fa-eye"></i>
        </a>
      </>
    );
  };

  const columnas = [
    "Nombre",
    "Apellidos",
    "Cédula",
    "Correo Eletrónico",
    "Puesto",
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
      <Navbar title={titulo} boton={true} url="/AgregarEmpleado" />
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="table-responsive">
              <Table
                titulo={"Empleados"}
                datos={empleados.map((empleado) => [
                  empleado.Nombre,
                  empleado.Apellidos,
                  empleado.Cedula,
                  empleado.CorreoElectronico,
                  empleado.Puesto,
                  empleado.estado ? "Activa" : "Desactivada",
                  Botones(empleado._id),  
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
