/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";
import axios from "axios";

export default function EditarProducto({}) {
  const titulo = "Editar producto";
  // Estados
  const [imagenesUI, setImagenesUI] = useState([]);
  const [imagenesOG, setImagenesOG] = useState([]);
  const [imagenesEliminadas, setImagenesEliminadas] = useState([]);
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

  const idRuta = window.location.pathname.split("/")[2];
  const ruta = process.env.REACT_APP_RUTA_DEV;

  useEffect(() => {
    axios
      .get(`${ruta}Productos/ObtenerProducto/${idRuta}`)
      .then((resp) => {
        setProducto(resp.data.producto);
        setImagenesUI(resp.data.producto.Imagen.map((img) => `${ruta}${img}`));
        setImagenesOG(resp.data.producto.Imagen);
      })
      .catch((err) => console.log(err));
    obtenerCategorias();
  }, []);

  async function obtenerCategorias() {
    let res = await axios.get(`${ruta}Categorias`);
    setCategorias(res.data);
  }

  const handleActualizar = async () => {
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

    let productoActualizado = {
      ...producto,
    };

    if (JSON.stringify(imagenesOG) === JSON.stringify(producto.Imagen)) {
      productoActualizado = {
        ...producto,
        eliminarImagenes: imagenesEliminadas,
      };
    }

    const imagenesASubir = producto.Imagen.filter(
      (imagen) => !imagenesOG.includes(imagen)
    );

    const imagenesSubidas = producto.Imagen.filter(
      (img) => !imagenesASubir.includes(img)
    );

    const formData = new FormData();
    imagenesASubir.forEach((img) => {
      formData.append("images", img);
    });

    const response = await axios.post(`${ruta}upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const resImagenesSubidas = response.data;
    let imgsArray = imagenesSubidas.concat(resImagenesSubidas);

    productoActualizado = {
      ...producto,
      Imagen: imgsArray,
      eliminarImagenes: imagenesEliminadas,
    };

    await axios
      .put(`${ruta}Productos/ActualizarProducto/${idRuta}`, productoActualizado)
      .then(() => {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Ha actualizado el producto correctamente",
            timer: 3500,
          });
        }, 3500);

        window.location = "/Productos";
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Error al registrar producto" + err,
            timer: 3500,
          });
        }, 3500);
      });
  };

  const renderizarImagenes = async (event) => {
    const archivosArray = Array.from(event.target.files);
    const blobArray = archivosArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImagenesUI((img) => img.concat(blobArray));
    setProducto({ ...producto, Imagen: producto.Imagen.concat(archivosArray) });
  };

  const eliminarImagen = async (index) => {
    setImagenesUI((img) => img.filter((_, i) => i !== index));
    
    if (imagenesOG.includes(producto.Imagen[index])) {
      setImagenesEliminadas((img) => img.concat(producto.Imagen[index]));
    }

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
                      value={producto.Nombre}
                      onChange={handleInputChange}
                      data-parsley-required-message="Campo requerido"
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
                      className="input-img"
                      id="Imagenes"
                      value={""}
                      accept="image/*"
                      onChange={renderizarImagenes}
                      multiple
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="images-gallery">
                    {imagenesUI.map((image, index) => (
                      <div key={index} className="image-gallery">
                        <img
                          src={`${image}`}
                          height="200"
                          alt={producto.Nombre}
                        />
                        <button
                          type="button"
                          onClick={() => eliminarImagen(index)}
                        >
                          Eliminar
                        </button>
                        <p>{index + 1}</p>
                      </div>
                    ))}
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
                      value={producto.Precio}
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
                      data-parsley-type="number"
                      data-parsley-type-message="Campo numerico"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      maxLength="4"
                      data-parsley-maxlength-message="El largo máximo es de 4 dígitos"
                      value={producto.Cantidad}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="mb-3">
                    <i className="icn-obligatorio">*</i>
                    <b>Categoría</b>
                    <select
                      className="custom-select"
                      value={producto.Categoria}
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
                      value={producto.Descripcion}
                      data-parsley-required-message="Campo requerido"
                      data-parsley-maxlength-message="El máximo de caracteres permitidos es de 500"
                    ></textarea>
                  </div>
                </div>

                <div className="col">
                  <button
                    type="button"
                    onClick={(e) => handleActualizar()}
                    className="btn btn-primary btn-block"
                  >
                    Guardar Producto
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
