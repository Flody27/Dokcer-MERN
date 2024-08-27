/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { UseCarrito } from "../Context/CarritoContext";
import Rating from "@mui/material/Rating";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Producto = () => {
  const carrito = UseCarrito();
  const ruta = process.env.REACT_APP_RUTA_DEV;
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  const params = useParams();
  const [cantidadProd, setCantidadProd] = useState(1);
  const [producto, setProducto] = useState({
    _id: "",
    Nombre: "",
    Precio: 0,
    Descripcion: "",
    Imagen: [],
    Categoria: "",
    Cantidad: "",
  });

  const [puntuacion, setPuntaucion] = useState(0);

  const [comentarios, setComentarios] = useState([]);

  const [comentario, setComentario] = useState({
    Comentario: "",
    ProductoId: "",
    UsuarioId: usuario?._id,
  });

  const [precioTotal, setPrecioTotal] = useState(producto.Precio);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    if (params.id) obtenerProducto();
    obtenerComentarios();
  }, []);

  useEffect(() => {
    carrito.calcularPrecioFinal();
    carrito.cantidadProductos();
  }, [agregarCarrito]);

  useEffect(() => {
    setPrecioTotal(parseInt(producto.Precio * cantidadProd));
  }, [aumentar, reducir]);

  useEffect(() => {
    setComentario({ ...comentario, ProductoId: producto._id });
  }, [producto]);

  function aumentar() {
    if (cantidadProd === producto.Cantidad) {
      Toast.fire({
        icon: "warning",
        title: "No quedan mas productos en bodega",
      });
      return;
    }
    setCantidadProd(parseInt(cantidadProd) + 1);
  }

  function reducir() {
    if (parseInt(cantidadProd) === 1) {
      return;
    }
    setCantidadProd(parseInt(cantidadProd) - 1);
  }

  function agregarCarrito() {
    carrito.agregar({
      id: producto._id,
      nombre: producto.Nombre,
      imagen: `${ruta}${producto.Imagen[0]}`,
      precio: producto.Precio,
      cantidad: cantidadProd,
      MaxCantidad: producto.Cantidad,
    });

    Toast.fire({
      icon: "success",
      title: "Producto agregado al carrito existosamente",
    });
  }

  async function obtenerProducto() {
    const res = await axios.get(
      ruta + "Productos/ObtenerProducto/" + params.id
    );
    setProducto(res.data.producto);
  }

  const handleInputChange = (e) => {
    setComentario({ ...comentario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(ruta + "AgregarComentario", comentario)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Comentario agregado exitosamente",
        });
        document.getElementById("Comentario").value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    obtenerComentarios();
  }, [handleSubmit]);

  async function obtenerComentarios() {
    const res = await axios.get(ruta + "Comentarios/" + params.id);
    setComentarios(res.data);
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Navbar title="Producto" />
      <section className="product-shop spad page-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6" style={{ width: "" }}>
                  <Carousel
                    responsive={responsive}
                    showDots={producto.Imagen.length > 1 ? true : false}
                    infinite={producto.Imagen.length > 1 ? true : false}
                    autoPlay={producto.Imagen.length > 1 ? true : false}
                  >
                    {producto.Imagen.map((img) => (
                      <div key={img.id} className="d-flex">
                        <img
                          src={`${ruta}${img}`}
                          alt={producto.Nombre}
                          style={{
                            margin: "0 auto",
                            maxWidth: "80%",
                            objectFit: "cover",
                          }}
                          height="450px"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div className="col-lg-6">
                  <div className="product-details">
                    <div className="pd-title">
                      <span>{producto.Categoria}</span>
                      <h3>{producto.Nombre}</h3>
                      {/* <a href="#" className="heart-icon">
                        <i className="icon_heart_alt" />
                      </a> */}
                    </div>
                    {/* <div className="pd-rating">
                      <i className="fa fa-star m-1" />
                      <i className="fa fa-star m-1" />
                      <i className="fa fa-star m-1" />
                      <i className="fa fa-star m-1" />
                      <i className="fa fa-star-o m-1" />
                      <span>(5)</span>
                    </div> */}
                    <div className="pd-desc">
                      <p>{producto.Descripcion}</p>
                      <h4>¢{precioTotal.toLocaleString("es")}</h4>
                    </div>

                    <div className="cantidad-producto mb-2">
                      <button type="button" onClick={reducir}>
                        <i className="ti-minus"></i>
                      </button>
                      <input type="text" value={cantidadProd} readOnly />
                      <button type="button" onClick={aumentar}>
                        <i className="ti-plus"></i>
                      </button>
                    </div>
                    <a
                      href="#"
                      onClick={agregarCarrito}
                      className="primary-btn mb-3"
                    >
                      Agregar al carrito
                    </a>

                    <ul className="pd-tags">
                      <li>
                        <span>Categoría</span>: {producto.Categoria}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="product-tab">
                <div className="tab-item">
                  <ul className="nav" role="tablist">
                    <li>
                      <a
                        className="active"
                        data-toggle="tab"
                        href="#Descripcion"
                        role="tab"
                      >
                        Descripción
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#Reseñas" role="tab">
                        Reseñas ({comentarios.length})
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-item-content">
                  <div className="tab-content">
                    {/*Descripcion*/}
                    <div
                      className="tab-pane fade-in active"
                      id="Descripcion"
                      role="tabpanel"
                    >
                      <div className="product-content">
                        <div className="row">
                          <div className="col-lg-7">{producto.Descripcion}</div>
                          <div className="col-lg-5">
                            <img src="img/product-single/tab-desc.jpg" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Reseña*/}

                    <div className="tab-pane fade" id="Reseñas" role="tabpanel">
                      <div className="customer-review-option">
                        {/* <h4>2 Comentarios</h4> */}

                        <div className="comment-option">
                          {comentarios.length === 0 ? (
                            <p>No hay comentarios</p>
                          ) : (
                            ""
                          )}
                          {comentarios.map((comt) => (
                            <div key={comt._id} className="co-item">
                              <div className="avatar-pic">
                                <img
                                  src={
                                    comt.usuario[0].FotoPerfil !== undefined
                                      ? comt.usuario[0].FotoPerfil.url
                                      : "/assets/img/picture.wep"
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="avatar-text">
                                {/* <div className="at-rating  m-0">
                                  <i className="fa fa-star m-0" />
                                  <i className="fa fa-star m-0" />
                                  <i className="fa fa-star m-0" />
                                  <i className="fa fa-star m-0" />
                                  <i className="fa fa-star-o m-0" />
                                </div> */}
                                <h5>
                                  {comt.usuario[0].Nombre +
                                    " " +
                                    comt.usuario[0].Apellidos}
                                  <span>
                                    {new Date(comt.Fecha).toLocaleDateString(
                                      "es"
                                    )}
                                  </span>
                                </h5>
                                <div className="at-reply">
                                  {comt.Comentario}
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* <div className="co-item">
                            <div className="avatar-pic">
                              <img src="/assets/img/picture.jpg" alt="" />
                            </div>
                            <div className="avatar-text">
                              <div className="at-rating  m-0">
                                <i className="fa fa-star m-0" />
                                <i className="fa fa-star m-0" />
                                <i className="fa fa-star m-0" />
                                <i className="fa fa-star m-0" />
                                <i className="fa fa-star-o m-0" />
                              </div>
                              <h5>
                                Brandon Kelley <span>27 Aug 2019</span>
                              </h5>
                              <div className="at-reply">Nice !</div>
                            </div>
                          </div> */}
                        </div>
                        <hr />

                        {/* <div className="personal-rating">
          <h6>Tu puntuacion</h6>
          <div className="rating">
            <i className="fa fa-star m-1" />
            <i className="fa fa-star m-1" />
            <i className="fa fa-star m-1" />
            <i className="fa fa-star m-1" />
            <i className="fa fa-star-o m-1" />
          </div>
        </div> */}

                        {usuario ? (
                          <div className="leave-comment">
                            <h4>Escribe un comentario</h4>
                            <form
                              action="#"
                              className="comment-form"
                              onSubmit={handleSubmit}
                            >
                              <div className="row">
                                <div className="col-lg-12">
                                  {/* <p>Puntuacion</p> */}
                                  {/* <Rating
                                  name="simple-controlled"
                                  value={puntuacion}
                                  onChange={(event, newValue) => {
                                    setPuntaucion(newValue);
                                  }}
                                /> */}
                                </div>
                                <div className="col-lg-12">
                                  <textarea
                                    placeholder="Comentario"
                                    name="Comentario"
                                    id="Comentario"
                                    onChange={handleInputChange}
                                    required
                                  />
                                  <button type="submit" className="site-btn">
                                    Comentar
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <a href="/login" className="primary-btn mb-3">
                            Inicia sesión aquí para agregar un comentario
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Producto;
