import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InfoEmpleado() {
  const titulo = "Informacion empleado ";
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const params = useParams();

  const [empleado, setEmpleado] = useState({
    Nombre: "",
    Apellidos: "",
    Telefono: 0,
    Cedula: 0,
    CorreoElectronico: "",
    Puesto: "",
    Sueldo: 0,
    estado: false,
  });

  useEffect(() => {
    if (params.id) getEmpleado();
  }, []);

  async function getEmpleado() {
    const res = await axios.get(`${ruta}BuscarEmpleado/${params.id}`);
    setEmpleado(res.data);
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
                  <div className="form-group mb-3">{empleado.Nombre}</div>
                </div>

                <div className="col-lg-4">
                  <b>Apellido</b>
                  <div className="form-group mb-3">{empleado.Apellidos}</div>
                </div>

                <div className="col-lg-4">
                  <b>Cedula</b>
                  <div className="form-group mb-3">{empleado.Cedula}</div>
                </div>

                <div className="col-lg-4">
                  <b>Teléfono</b>
                  <div className="form-group mb-3">{empleado.Telefono}</div>
                </div>

                <div className="col-lg-4">
                  <b>Correo</b>
                  <div className="form-group mb-3">
                    {empleado.CorreoElectronico}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Puesto</b>
                  <div className="form-group mb-3">{empleado.Puesto}</div>
                </div>

                <div className="col-lg-4">
                  <b>Sueldo</b>
                  <div className="form-group mb-3">
                    ¢{parseInt(empleado.Sueldo).toLocaleString()}
                  </div>
                </div>
                <div className="col-lg-4">
                  <b>Estado de cuenta</b>
                  <div className="form-group mb-3">
                    {empleado.estado ? "Activa" : "Desactivada"}
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-warning btn-block"
                    onClick={() => {
                      window.location.replace("/Empleados");
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
