/* eslint-disable no-undef */
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PedidosTarjeta from "../components/PedidosTarjeta";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Checkout = () => {
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const [contactInfo, setContactInfo] = useState({
    nombre: "",
    apellidos: "",
    telefono: 0,
    correo: "",
    direccion1: "",
    direccionAlt: "",
    ciudad: "",
    provincia: "",
    codigo: "",
  });
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [numeroFactura, setNumeroFactura] = useState();

  useEffect(() => {
    let token = localStorage.getItem("token");

    // LLAMAR VALORES DESDE LOCAL STORAGE
    const productos = JSON.parse(localStorage.getItem("Carrito"));
    const usuario = JSON.parse(localStorage.getItem("usuario"))._id;

    if (!token) {
      window.location = "/";
      return;
    }

    if (!productos) {
      window.location = "/";
      return;
    }

    if (!usuario) {
      window.location = "/";
      return;
    }

    // ASIGNAR VALORES DESDE LOCAL STORAGE
    setUsuario(usuario ? usuario : "");
    setProductos(productos ? productos : []);

    obtenerUsuario();
  }, []);

  const validarStrings = (e) => {
    $(`#${e.target.id}`).parsley().validate();
  };

  const handleCheckout = async (event) => {
    event.preventDefault();

    var costoFinal = 0;

    productos.forEach((prod) => {
      costoFinal += prod.precio * prod.cantidad;
    });

    return Swal.fire({
      title: "¿Esta seguro de finalizar su compra?",
      text:
        "El monto total de su compra es de: ₡" +
        costoFinal.toLocaleString("es"),
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Finalizar compra",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_RUTA_DEV}Pedidos/registrarPedidoSinpe`,
            {
              Usuario: usuario,
              Identificacion: identificacion,
              Productos: productos,
              NumeroFactura: numeroFactura.toString(),
              Contacto: contactInfo,
            }
          )
          .then(async (resp) => {
            await Swal.fire(
              "¡Gracias por su compra!",
              "Ha registrado su pedido correctamente",
              "success"
            );
            window.location.href = "/pedidos";
            localStorage.removeItem("Carrito");
            return;
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "¡Ha ocurrido un problema!",
              "Vuelva a intentarlo ó contactenos al Whatsapp 6028-2364",
              "info"
            );
            return;
          });
      }
    });
  };

  async function obtenerUsuario() {
    const res = await axios.get(
      `${ruta}BuscarCliente/${JSON.parse(localStorage.getItem("usuario"))._id}`
    );
    const {
      Nombre,
      Apellidos,
      CodigoPostal,
      CorreoElectronico,
      Direccion,
      Telefono,
      Ciudad,
      Provincia,
      DireccionAlt,
    } = res.data;
    setContactInfo({
      ...contactInfo,
      nombre: Nombre,
      apellidos: Apellidos,
      telefono: Telefono,
      correo: CorreoElectronico,
      direccion1: Direccion,
      codigo: CodigoPostal,
      ciudad: Ciudad,
      provincia: Provincia,
      direccionAlt: DireccionAlt,
    });
  }

  return (
    <>
      {/* NAVBAR */}
      <Navbar title="Checkout" />

      {/* Main de la pagina */}
      <div className="container" style={{ marginBottom: "5%" }}>
        <div className="container mt-4 mb-4 d-flex justify-content-center">
          <div className="flex-column">
            <h2 className="text-center">Pago</h2>
          </div>
        </div>

        <div className="container">
          <h3 className="my-4">Información de contacto</h3>
          <p className="my-4 msg-alerta">
            <i className="ti-info-alt"></i> Revise si la información es la
            correcta antes de completar el pedido
          </p>
          <form
            class="row g-3"
            onSubmit={(event) => handleCheckout(event)}
            data-parsley-validate
            data-parsley-focus="none"
          >
            <div class="col-md-6">
              <label for="nombre" class="form-label">
                Nombre:
              </label>
              <input
                type="text"
                maxLength="50"
                class="form-control"
                id="nombre"
                value={contactInfo.nombre}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    nombre: event.target.value,
                  });
                  validarStrings(event);
                }}
                required
                data-parsley-required-message="Campo requerido"
                pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                data-parsley-pattern-message="No se admite números y caracteres especiales"
              />
            </div>
            <div class="col-md-6">
              <label for="apellidos" class="form-label">
                Apellidos:
              </label>
              <input
                type="text"
                maxLength="50"
                class="form-control"
                id="apellidos"
                value={contactInfo.apellidos}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    apellidos: event.target.value,
                  });
                  validarStrings(event);
                }}
                required
                data-parsley-required-message="Campo requerido"
                pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                data-parsley-pattern-message="No se admite números y caracteres especiales"
              />
            </div>
            <div class="col-md-6">
              <label for="apellidos" class="form-label">
                Teléfono:
              </label>
              <input
                type="number"
                class="form-control"
                id="telefono"
                value={contactInfo.telefono}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    telefono: event.target.value,
                  });
                  validarStrings(event);
                }}
                required
                data-parsley-required-message="Campo requerido"
                data-parsley-length="[8, 8]"
                data-parsley-length-message="Debe ser 8 dígitos de largo"
                min="0"
                data-parsley-min-message="Debe ser un valor no negativo"
                data-parsley-type="integer"
                data-parsley-type-message="Campo numérico"
              />
            </div>
            <div class="col-md-6">
              <label for="apellidos" class="form-label">
                Correo:
              </label>
              <input
                type="email"
                class="form-control"
                id="correo"
                maxLength="50"
                value={contactInfo.correo}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    correo: event.target.value,
                  });
                  validarStrings(event);
                }}
                data-parsley-type="email"
                data-parsley-type-message="Formato de correo electrónico inválido"
                data-parsley-required-message="Campo requerido"
                required
              />
            </div>
            <div class="col-lg-6">
              <label for="direccion1" class="form-label mt-1">
                Dirección:
              </label>
              <textarea
                name="Direccion"
                id="direccion"
                maxLength="200"
                aria-label="DireccionCliente"
                placeholder="Ingrese la dirección del cliente"
                rows="3"
                class="form-control"
                value={contactInfo.direccion1}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    direccion1: event.target.value,
                  });
                  validarStrings(event);
                }}
                data-parsley-required-message="Campo requerido"
                required
              ></textarea>
            </div>
            <div class="col-lg-6">
              <label for="direccion2" class="form-label mt-1">
                Dirección 2 (opcional):
              </label>
              <textarea
                name="Direccion"
                id="direccion2"
                maxLength="200"
                aria-label="DireccionCliente"
                placeholder="Ingrese la dirección del cliente"
                rows="3"
                class="form-control"
                value={contactInfo?.direccionAlt}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    direccionAlt: event.target.value,
                  });
                  validarStrings(event);
                }}
              ></textarea>
            </div>
            <div class="col-lg-4">
              <label for="ciudad" class="form-label mt-1">
                Ciudad:
              </label>
              <input
                type="text"
                class="form-control"
                id="ciudad"
                maxLength="30"
                value={contactInfo.ciudad}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    ciudad: event.target.value,
                  });
                  validarStrings(event);
                }}
                pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                data-parsley-pattern-message="No se admite números y caracteres especiales"
                data-parsley-required-message="Campo requerido"
                required
              />
            </div>
            <div class="col-lg-4">
              <label for="provincia" class="form-label mt-1">
                Provincia:
              </label>
              <input
                type="text"
                class="form-control"
                id="provincia"
                maxLength="20"
                value={contactInfo.provincia}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    provincia: event.target.value,
                  });
                  validarStrings(event);
                }}
                pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                data-parsley-pattern-message="No se admite números y caracteres especiales"
                data-parsley-required-message="Campo requerido"
                required
              />
            </div>
            <div class="col-lg-4">
              <label for="codigoPostal" class="form-label mt-1">
                Código Postal:
              </label>
              <input
                type="text"
                class="form-control codigo"
                id="codigoPostal"
                value={contactInfo.codigo}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    codigo: event.target.value,
                  });
                  validarStrings(event);
                }}
                data-parsley-required-message="Campo requerido"
                required
                min="0"
                data-parsley-min-message="Debe ser un valor no negativo"
                data-parsley-length="[5, 5]"
                data-parsley-length-message="Debe ser 5 dígitos de largo"
              />
            </div>
            <div className="container mt-4 mb-4 d-flex justify-content-center">
              <div className="flex-column">
                <h2 className="text-center">Medios de Pago</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <h4 className="my-4">Seleccione el medio de pago: </h4>
            </div>

            <div className="col-lg-6">
              <div
                class="card mb-3"
                style={{
                  maxWidth: "380px",
                  borderStyle: "solid",
                  borderColor: "#e8e8e8",
                  padding: "2px 8px",
                  cursor: "pointer",
                  backgroundColor: "#e7ab3c",
                  color: "White",
                  height: "83%",
                }}
              >
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      width="80"
                      src="/assets/img/sinpeMovil-logo.png"
                      class="img-fluid rounded-start mt-1"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8 w-100">
                    <div class="card-body">
                      <h5 class="card-title, text-white">Sinpe Móvil</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                class="card mb-3"
                style={{
                  maxWidth: "380px",
                  borderStyle: "solid",
                  borderColor: "#e8e8e8",
                  padding: "2px 8px",
                  cursor: "not-allowed",
                }}
              >
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      width="60"
                      src="/assets/img/pagoTarjeta3-logo.png"
                      class="img-fluid rounded-start mt-1"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8 w-100">
                    <div class="card-body">
                      <h6 class="card-title">Tarjeta de Crédito/Débito</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <label for="cedula" class="form-label">
                Número de Identificación:
              </label>
              <input
                type="text"
                class="form-control"
                id="cedula"
                value={identificacion}
                onChange={(event) => {
                  setIdentificacion(event.target.value);
                  validarStrings(event);
                }}
                min="0"
                data-parsley-min-message="Debe ser un valor no negativo"
                data-parsley-length="[9, 9]"
                data-parsley-length-message="Debe ser 9 dígitos de largo"
                data-parsley-required-message="Campo requerido"
                required
              />
            </div>
            <div class="col-lg-6">
              <label for="factura" class="form-label">
                Número de factura:
              </label>
              <input
                type="number"
                class="form-control"
                id="factura"
                value={numeroFactura}
                onChange={(event) => {
                  setNumeroFactura(parseInt(event.target.value));
                  validarStrings(event);
                }}
                min="0"
                data-parsley-min-message="Debe ser un valor no negativo"
                data-parsley-minlength="10"
                data-parsley-minlength-message="Debe ser minimo 10 dígitos de largo"
                data-parsley-required-message="Campo requerido"
                required
              />
            </div>

            <div class="col-12 my-4">
              <button
                type="submit"
                class="btn btn-block"
                style={{
                  backgroundColor: "#e7ab3c",
                  color: "White",
                  padding: "10px 14px",
                }}
              >
                Finalizar compra
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
