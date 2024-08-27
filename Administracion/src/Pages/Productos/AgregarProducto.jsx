/* eslint-disable no-undef */
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AgregarProducto() {
  const titulo = "Agregar producto";

  const [imagenesUI, setImagenesUI] = useState([]);
  const [categorias, setCategorias] = useState([
    {
      _id: "",
      Categoria: "",
    },
  ]);
  const [producto, setProducto] = useState({
    Nombre: "",
    Precio: 0,
    Cantidad: 0,
    Descripcion: "",
    Imagen: [],
    Categoria: "",
  });

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    if (categorias.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No se puede realizar esta acción.",
        text: "No hay categorías registradas, por ende no se puede proceder con la acción, primero registré una categoría",
        timer: 3000,
      }).then(() => {
        window.location = "/Categorias";
      });
    }
  }, [categorias]);

  async function obtenerCategorias() {
    let res = await axios.get(`${process.env.REACT_APP_RUTA_DEV}Categorias`);
    setCategorias(res.data);
  }

  const handleRegistrar = async (e) => {
    e.preventDefault();
    const ruta = process.env.REACT_APP_RUTA_DEV;

    if (imagenesUI.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Ingrese mínimo una imagen",
        timer: 2500,
      });
    }

    if (
      !campoValido("Nombre") &&
      !campoValido("Precio") &&
      !campoValido("Cantidad") &&
      !campoValido("Descripcion") &&
      !campoValido("Categoria")
    ) {
      return;
    }

    const Data = new FormData();
    producto.Imagen.forEach((img) => {
      Data.append("images", img);
    });

    const response = await axios.post(`${ruta}upload`, Data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const uploadedImageNames = response.data;

    const updatedProduct = {
      ...producto,
      Imagen: uploadedImageNames,
    };

    await axios
      .post(`${ruta}Productos/CrearProducto`, updatedProduct)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Ha registrado el producto correctamente",
          timer: 2500,
        }).then(() => {
          window.location = "/Productos";
        });
      })
      .catch((err) => {
        console.log(err)
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Error al registrar producto" + err,
            timer: 2500,
          });
        }, 2500);
      });
  };

  const renderizarImagenes = (event) => {
    const arrayArchivos = Array.from(event.target.files);
    const imagenesArray = arrayArchivos.map((file) => {
      return URL.createObjectURL(file);
    });

    setImagenesUI((img) => img.concat(imagenesArray));
    setProducto({ ...producto, Imagen: arrayArchivos });
  };

  const eliminarImagen = (index) => {
    setImagenesUI(imagenesUI.filter((_, i) => i !== index));
    setProducto({
      ...producto,
      Imagen: producto.Imagen.filter((_, i) => i !== index),
    });
  };

  const handleInputChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
    $(`#${e.target.id}`).parsley().validate();
  };

  function campoValido(campo) {
    if ($(`#${campo}`).parsley().isValid()) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: $(`#${campo}`).parsley().getErrorsMessages(),
        timer: 2500,
      });
    }
  }

  return (
    <Layout title={titulo}>
      <Navbar title={titulo} />
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <form
              data-parsley-validate
              data-parsley-focus="none"
              className="card form-valid"
              onSubmit={handleRegistrar}
            >
              <div className="body row">
                <div className="col-lg-12 my-2">
                  <small>
                    <i className="icn-obligatorio">*</i> Campo obligatorio
                  </small>
                </div>
                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Nombre</b> <small>(50 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="50"
                      className="form-control"
                      placeholder="Ingrese el nombre del producto"
                      aria-label="NombreDelProducto"
                      name="Nombre"
                      id="Nombre"
                      data-parsley-required-message="Campo requerido"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Imagen</b>
                  <div className="form-group mb-3">
                    <label className="label-img" htmlFor="Imagenes">
                      <i className="ti-upload"></i> &nbsp;Subir imagenes
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      value={""}
                      className="input-img"
                      id="Imagenes"
                      onChange={renderizarImagenes}
                      multiple
                    />
                  </div>
                </div>

                <div className="col-lg-12 my-2">
                  <div className="images-gallery">
                    {imagenesUI.map((image, index) => {
                      return (
                        <div key={index} className="image-gallery">
                          <img src={image} height="200" alt="upload" />
                          <button onClick={() => eliminarImagen(index)}>
                            Eliminar
                          </button>
                          <p>{index + 1}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Precio</b>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese el precio"
                      aria-label="PrecioDelProducto"
                      name="Precio"
                      id="Precio"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-required-message="Campo requerido"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numerico"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Cantidad</b> <small>(4 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese la cantidad del producto"
                      aria-label="CantidadDelProducto"
                      name="Cantidad"
                      id="Cantidad"
                      data-parsley-required-message="Campo requerido"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numerico"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      maxLength="4"
                      data-parsley-maxlength-message="El largo máximo es de 4 dígitos"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="mb-3">
                    <i className="icn-obligatorio">*</i>
                    <b>Categoría</b>
                    <select
                      className="custom-select"
                      id="Categoria"
                      name="Categoria"
                      onChange={handleInputChange}
                      required
                      data-parsley-required-message="Categoría requerida"
                    >
                      <option value="" selected disabled>
                        Selecione una categoría
                      </option>
                      {categorias.map((cat) => (
                        <option key={cat._id} value={cat.Categoria}>
                          {cat.Categoria}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Descripción</b>
                  <div className="form-group mb-3">
                    <textarea
                      name="Descripcion"
                      id="Descripcion"
                      maxLength="2000"
                      aria-label="DescripcionDelProducto"
                      placeholder="Ingrese la descripción del producto"
                      rows="3"
                      class="form-control"
                      onChange={handleInputChange}
                      required
                      data-parsley-required-message="Campo requerido"
                    ></textarea>
                  </div>
                </div>

                <div className="col">
                  <button type="submit" className="btn btn-primary btn-block">
                    Agregar Producto
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={() => {
                      window.location.replace("/Productos");
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
