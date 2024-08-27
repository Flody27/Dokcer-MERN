import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar";
import Table from "../../Components/Table";
import axios from "axios";

export default function Productos() {
  const titulo = "Productos";

  const [Productos, setProductos] = useState([]);
  const ruta = process.env.REACT_APP_RUTA_DEV;
  useEffect(() => {
    axios
      .get(ruta + "Productos/ObtenerProductos")
      .then((resp) => {
        setProductos(resp.data.productos);
      })
      .catch((err) => console.log(err));
  }, []);

  function eliminarProducto(id, imagenes) {
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
        axios
          .delete(
            `${process.env.REACT_APP_RUTA_DEV}Productos/EliminarProducto/${id}`,
            { data: imagenes }
          )
          .then(() => {
            Swal.fire({
              title: "Eliminado",
              text: "Se elimino con exito",
              icon: "success",
              timer: 1500,
            }).then(() => window.location.replace("/Productos"));
          });
      }
    });
  }

  const Botones = (id, imagenes) => {
    return (
      <>
        <a
          href={`/EditarProducto/${id}`}
          className="btn btn-primary btn-sm mx-1"
        >
          <i className="fa fa-edit"></i>
        </a>
        <button
          type="button"
          onClick={() => {
            eliminarProducto(id, imagenes);
          }}
          className="btn btn-danger btn-sm mx-1"
        >
          <i className="fa fa-trash-o"></i>
        </button>
        <a href={`/Producto/${id}`} className="btn btn-success btn-sm mx-1">
          <i className="fa fa-eye"></i>
        </a>
      </>
    );
  };

  const columnas = [
    "Nombre del producto",
    "Precio",
    "Cantidad",
    "Categoria",
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
      <Navbar title={titulo} boton={true} url="/AgregarProducto" />
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="table-responsive"></div>
            <Table
              titulo={"Productos"}
              columnas={columnas}
              datos={Productos.map((producto) => [
                producto.Nombre,
                producto.Precio,
                producto.Cantidad,
                producto.Categoria,
                Botones(producto._id, producto.Imagen),
              ])}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
