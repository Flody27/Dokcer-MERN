import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { UseCarrito } from "../Context/CarritoContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const [productos, setProductos] = useState([]);
  const carrito = UseCarrito();

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
    getProductos();
  }, []);

  useEffect(() => {
    carrito.calcularPrecioFinal();
    carrito.cantidadProductos();
  }, [agregarCarrito]);

  function getProductos() {
    axios
      .get(ruta + "Productos/ObtenerProductos")
      .then((resp) => {
        setProductos(resp.data.productos);
      })
      .catch((err) => console.log(err));
  }

  function agregarCarrito(producto) {
    carrito.agregar({
      id: producto._id,
      nombre: producto.Nombre,
      imagen: `${ruta}${producto.Imagen[0]}`,
      precio: producto.Precio,
      MaxCantidad: producto.Cantidad,
    });

    Toast.fire({
      icon: "success",
      title: "Producto agregado al carrito existosamente",
    });
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const responsiveBanner = {
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

  function Productos() {
    return (
      <Carousel
        responsive={responsive}
        showDots={true}
        infinite={true}
        autoPlay={true}
      >
        {productos.map((prod) => {
          return (
            <div class="product-item" style={{ margin: "10px" }}>
              <div class="pi-pic">
                <img src={`${ruta}${prod.Imagen[0]}`} alt="" />
                {/* <div class="sale">Sale</div> */}
                <ul>
                  <li class="w-icon active">
                    <button onClick={() => agregarCarrito(prod)}>
                      <i class="icon_bag_alt"></i>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="pi-text">
                <div class="catagory-name">{prod.Categoria}</div>
                <a href={`/producto/${prod._id}`}>
                  <h5>{prod.Nombre}</h5>
                </a>
                <div class="product-price">
                  ₡{prod.Precio.toLocaleString("es")}
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    );
  }

  return (
    <div className="App">
      <Navbar title="Inicio" />

      <section className="hero-section responsive-invisble">
        {/* <div class="hero-items owl-carousel">
   

          <div
            class="single-hero-items set-bg"
            data-setbg="/assets/img/miel_con_limon.png"
          >
            <div class="container">
              <div class="row">
                <div class="col-lg-5">
                  <h1 style={{ color: "white" }}>Miel con Limón</h1>
                  <a href="#" class="primary-btn">
                    Comprar ahora
                  </a>
                </div>
              </div>
              <div class="off-card">
                <h2>
                  Descuento <span>25%</span>
                </h2>
              </div>
            </div>
          </div>
        </div> */}

        <div className="hero-items">
          <Carousel
            responsive={responsiveBanner}
            arrows={true}
            showDots={false}
            infinite={true}
            autoPlay={true}
          >
            <div
              class="single-hero-items"
              style={{
                background: "url('/assets/img/banner-1.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              <div class="container">
                <div class="row">
                  <div class="col-lg-5"></div>
                </div>
              </div>
            </div>
            <div
              class="single-hero-items"
              style={{
                background: "url('/assets/img/huella_ecologica.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              <div class="container">
                <div class="row">
                  <div class="col-lg-5"></div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </section>

      <div className="responsive-show">
        <Carousel
          responsive={responsiveBanner}
          arrows={false}
          showDots={true}
          infinite={true}
          autoPlay={true}
        >
          <div>
            <img
              className="img-banner-rps"
              src="/assets/img/banner-1.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="img-banner-rps"
              src="/assets/img/QueensHoney.jpg"
              alt=""
            />
          </div>
        </Carousel>
      </div>

      <div class="banner-section spad">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-4">
              <div class="single-banner">
                <img src="/assets/img/miel_abeja2.jpg" alt="" />
                <div class="inner-text">
                  <a href="#Miel">
                    <h4>Mieles</h4>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="single-banner">
                <img
                  src="assets/img/Balsamo la miel de pao-l.png"
                  alt="Balsamo de miel"
                />
                <div class="inner-text">
                  <a href="#Balsamo">
                    <h4>Bálsamos</h4>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="single-banner">
                <img src="assets/img/Foto_Face_11.jpg" alt="" />
                <div class="inner-text">
                  <a href="#Vela">
                    <h4>Velas</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        id="Miel"
        class="left-banner spad"
        style={{ display: productos.length > 0 ? "block" : "none" }}
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-3 responsive-invisble">
              <div
                class="product-large "
                style={{
                  background: "url('/assets/img/Miel-con-chile-Carrousel.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "top center",
                }}
              >
                <h2>Nuestros productos</h2>
                <a href="/productos">Discubrí más</a>
              </div>
            </div>
            <div class="col-lg-8 offset-lg-1">
              <div class="filter-control">
                <ul>
                  <li class="active">Productos</li>
                </ul>
              </div>
              <Productos />
            </div>
          </div>
        </div>
      </section>

      <div class="instagram-photo responsive-invisble">
        <div
          class="insta-item"
          style={{
            background: "url('/assets/img/foto-1_insta.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div class="inside-text">
            <i class="ti-instagram"></i>
            <h5>
              <a href="https://www.instagram.com/p/Ckme1MRuUZM/">
                La Miel de Pao
              </a>
            </h5>
          </div>
        </div>
        <div
          class="insta-item"
          style={{
            background: "url('/assets/img/foto-2_insta.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div class="inside-text">
            <i class="ti-instagram"></i>
            <h5>
              <a href="https://www.instagram.com/p/CXUnvCzMY-h/">
                La Miel de Pao
              </a>
            </h5>
          </div>
        </div>
        <div
          class="insta-item"
          style={{
            background: "url('/assets/img/foto-3_insta.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div class="inside-text">
            <i class="ti-instagram"></i>
            <h5>
              <a href="https://www.instagram.com/p/CRPBChoDWDj/">
                La Miel de Pao
              </a>
            </h5>
          </div>
        </div>
        <div
          class="insta-item"
          style={{
            background: "url('/assets/img/foto-4_insta.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div class="inside-text">
            <i class="ti-instagram"></i>
            <h5>
              <a href="https://www.instagram.com/p/CEAs0JpHFmL/">
                La Miel de Pao
              </a>
            </h5>
          </div>
        </div>
        <div
          class="insta-item"
          style={{
            background: "url('/assets/img/foto-5_insta.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div class="inside-text">
            <i class="ti-instagram"></i>
            <h5>
              <a href="https://www.instagram.com/p/CGBdXyKH7_-/">
                La Miel de Pao
              </a>
            </h5>
          </div>
        </div>
        <div
          class="insta-item"
          style={{
            background: "url('/assets/img/foto-6_insta.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div class="inside-text">
            <i class="ti-instagram"></i>
            <h5>
              <a href="https://www.instagram.com/p/CD2eDytpfTX/">
                La Miel de Pao
              </a>
            </h5>
          </div>
        </div>
      </div>

      <section class="latest-blog spad">
        <div class="container">
          <div class="benefit-items">
            <div class="row">
              <div class="col-lg-4">
                <div class="single-benefit">
                  <div class="sb-icon">
                    <img src="assets/img/icon-1.png" alt="" />
                  </div>
                  <div class="sb-text">
                    <h6>Envíos a todo el país</h6>
                    <p>
                      Glovo, Correo de Costa Rica y mensajería privada.
                      <pre wp-pre-tag-2=""></pre>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="single-benefit">
                  <div class="sb-icon">
                    <img src="assets/img/icon-2.png" alt="" />
                  </div>
                  <div class="sb-text">
                    <h6>Entrega a tiempo</h6>
                    <p>
                      Realizamos el envío lo más pronto posible para su
                      satisfacción.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="single-benefit">
                  <div class="sb-icon">
                    <img src="assets/img/credit-card (Custom).png" alt="" />
                  </div>
                  <div class="sb-text">
                    <h6>Pagos seguros</h6>
                    <p>Haga sus pagos en línea con confianza.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
