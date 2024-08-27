/* eslint-disable no-undef */
import Layout from "../../Components/Layout";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categorias() {
  const titulo = "Categorías";
  const ruta = process.env.REACT_APP_RUTA_DEV + "AgregarCategoria";
  const [categorias, setCategorias] = useState([{ _id: "", Categoria: "" }]);
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    obtenerCategorias();
  }, []);

  async function obtenerCategorias() {
    let res = await axios.get(`${process.env.REACT_APP_RUTA_DEV}Categorias`);
    setCategorias(res.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(ruta, { Categoria: categoria })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Categoria agregada con exito",
          timer: 1500,
        }).then(() => {
          window.location = "/Categorias";
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error agregando Categoria.",
          html: err.response.data.message,
          timer: 2500,
        });
      });
  };

  function eliminar(id) {
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
          .delete(`${process.env.REACT_APP_RUTA_DEV}EliminarCategoria/${id}`)
          .then(() => {
            Swal.fire({
              title: "Eliminado",
              text: "Se elimino con exito",
              icon: "success",
              timer: 1500,
            }).then(() => window.location.replace("/Categorias"));
          });
      }
    });
  }

  const Boton = (id) => {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            eliminar(id);
          }}
          className="btn btn-danger btn-sm mx-1"
        >
          <i className="fa fa-trash-o"></i> Eliminar
        </button>
      </>
    );
  };

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

  return (
    <Layout title={titulo}>
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <form
              className="card"
              data-parsley-validate
              data-parsley-focus="none"
              onSubmit={handleSubmit}
            >
              <div className="body">
                <div className="col-lg-12 my-2">
                  <small>
                    <i className="icn-obligatorio">*</i> Campo obligatorio
                  </small>
                </div>
                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Categoría</b> <small>(30 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese una categoría"
                      aria-label="Categoria"
                      name="Categoria"
                      id="Categoria"
                      maxLength="30"
                      data-parsley-required-message="Campo categoría requerido"
                      required
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      onChange={(e) => {
                        setCategoria(e.target.value);
                        $(`#${e.target.id}`).parsley().validate();
                      }}
                    />
                  </div>
                  {categorias.length === 0 ? (
                    <small>
                      <p>
                        <i
                          class="fa fa-info-circle mx-2"
                          aria-hidden="true"
                        ></i>
                        Se debe registrar al menos una categoría para poder
                        registrar un producto.
                      </p>
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-primary btn-block">
                    Agregar Categoría
                  </button>
                </div>
              </div>
            </form>
            <MUIDataTable
              title={"Categorías"}
              columns={["Categoría", "Eliminar"]}
              options={options}
              data={categorias.map((cat) => [cat.Categoria, Boton(cat._id)])}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
