/* eslint-disable no-undef */
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

export default function AgregarPedido() {
  const titulo = "Agregar pedido";
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedido, setPedido] = useState({
    Usuario: "",
    Identificacion: "",
    Productos: [
      {
        nombre: "",
        imagen: "",
        precio: "",
        cantidad: "",
        id: "",
      },
    ],
    MedioPago: "Sinpe",
    NumeroFactura: "",
    Estado: "",
    CostoTotal: 0,
    Contacto: {
      nombre: "",
      apellidos: "",
      telefono: 0,
      correo: "",
      direccion1: "",
      direccion2: "",
      ciudad: "",
      provincia: "",
      codigo: "",
    },
  });

  const [productosSlct, setProductosSlct] = useState([]);

  useEffect(() => {
    obtenerProductos();
    obtenerClientes();
  }, []);

  useEffect(() => {
    setPedido({ ...pedido, CostoTotal: obtenerPrecio() });
  }, [pedido.Productos]);

  async function obtenerProductos() {
    const res = await axios.get(ruta + "Productos/ObtenerProductos");
    setProductos(res.data.productos);
  }
  async function obtenerClientes() {
    const res = await axios.get(`${ruta}BuscarClientes`);
    setClientes(res.data);
  }

  function selecionarCliente(e) {
    var id = e.target.value;
    let usuario = clientes.find((cli) => cli._id === id);
    setPedido({
      ...pedido,
      Contacto: {
        ...pedido.Contacto,
        nombre: usuario.Nombre,
        apellidos: usuario.Apellidos,
        direccion1: usuario.Direccion || "",
        direccion2: usuario.Direccion2 || "",
        ciudad: usuario.Ciudad || "",
        provincia: usuario.Provincia || "",
        codigo: usuario.CodigoPostal || "",
        correo: usuario.CorreoElectronico,
        telefono: usuario.Telefono || "",
      },
      Usuario: usuario._id,
    });
  }

  const editarContacto = (e) => {
    setPedido({
      ...pedido,
      Contacto: { ...pedido.Contacto, [e.target.name]: e.target.value },
    });
    $(`#${e.target.id}`).parsley().validate();
  };

  const editarPedido = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
    $(`#${e.target.id}`).parsley().validate();
  };

  const selectProductos = (event) => {
    const {
      target: { value },
    } = event;
    setProductosSlct(typeof value === "string" ? value.split(",") : value);

    let productosSelec = [];
    for (let i = 0; i < value.length; i++) {
      var idActual = value[i];
      var productoActual = productos.find((prod) => prod._id === idActual);
      productosSelec.push({
        id: productoActual._id,
        nombre: productoActual.Nombre,
        imagen: productoActual.Imagen[0]?.url,
        precio: productoActual.Precio,
        cantidad: 1,
      });
    }

    setPedido({
      ...pedido,
      Productos: productosSelec,
    });
  };

  function obtenerPrecio() {
    let total = 0;
    pedido.Productos.forEach((prod) => {
      total += parseInt(prod.precio * prod.cantidad);
    });

    return total;
  }

  async function Registrar(e) {
    e.preventDefault();

    if (
      !campoValido("telefono") &&
      !campoValido("correo") &&
      !campoValido("direccion1") &&
      !campoValido("codigo") &&
      !campoValido("NumeroFactura") &&
      !campoValido("Identificacion") &&
      !campoValido("MedioPago") &&
      !campoValido("Estado") &&
      !campoValido("provincia") &&
      !campoValido("ciudad")
    ) {
      return;
    }

    if (productosSlct.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Agregue al menos un producto",
        timer: 2500,
      });
      return;
    }

    await axios
      .post(ruta + "Pedidos/registrarPedidoSinpe", pedido)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Pedido agregado con exito",
          timer: 2000,
        }).then(() => {
          window.location.replace("/Pedidos");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error agregando pedido.",
          html: err.response.data.message,
          timer: 2500,
        });
      });
  }

  function cambiarCantidad(e, pos) {
    // let pedidoEcontrado = pedido.Productos.find((prod) => prod.id === id);
    // pedidoEcontrado.cantidad = e.target.value;
    // setPedido({ ...pedido, Productos: pedidoEcontrado });
    // console.log(pedidoEcontrado);
    var cantidad = parseInt(e.target.value);

    if (cantidad < 1 || isNaN(cantidad)) {
      cantidad = 1;
    }

    let actuProd = [...pedido.Productos];
    actuProd[pos].cantidad = cantidad;
    setPedido({ ...pedido, Productos: actuProd, CostoTotal: obtenerPrecio() });
  }

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
              onSubmit={Registrar}
            >
              <div className="body row">
                <div className="col-lg-12 my-2">
                  <small>
                    <i className="icn-obligatorio">*</i> Campo obligatorio
                  </small>
                </div>
                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Clientes</b>
                  <div className="form-group mb-3">
                    <select
                      className="custom-select"
                      id="Clientes"
                      data-parsley-required
                      data-parsley-required-message="Selecione un cliente"
                      name="Estado"
                      onChange={selecionarCliente}
                    >
                      <option disabled selected value="Selecione un cliente">
                        Selecione un cliente
                      </option>
                      {clientes.map((cli) => (
                        <option key={cli._id} value={cli._id}>
                          {cli.Nombre + " " + cli.Apellidos}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <i className="icn-obligatorio">*</i>
                  <b>Nombre</b> <small>(50 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="50"
                      className="form-control"
                      placeholder="Ingrese el nombre del cliente"
                      aria-label="NombreCliente"
                      data-parsley-required-message="Campo requerido"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      name="nombre"
                      id="nombre"
                      required
                      value={pedido.Contacto?.nombre}
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <b>
                    <i className="icn-obligatorio">*</i>Apellidos{" "}
                    <small>(50 caracteres máximo)</small>
                  </b>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="50"
                      className="form-control"
                      placeholder="Ingrese los apellidos del cliente"
                      aria-label="ApellidosCliente"
                      data-parsley-required-message="Campo requerido"
                      name="apellidos"
                      id="apellidos"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      required
                      value={pedido.Contacto?.apellidos}
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <i className="icn-obligatorio">*</i>
                  <b>Teléfono</b> <small>(8 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese el teléfono del cliente"
                      aria-label="telefono"
                      name="telefono"
                      id="telefono"
                      data-parsley-required-message="Campo requerido"
                      data-parsley-length="[8, 8]"
                      data-parsley-length-message="Debe ser 8 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numerico"
                      value={pedido.Contacto?.telefono}
                      required
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <i className="icn-obligatorio">*</i>
                  <b>Correo</b> <small>(50 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      maxLength="50"
                      className="form-control email"
                      placeholder="Ingrese el correo del cliente"
                      aria-label="correo"
                      name="correo"
                      id="correo"
                      data-parsley-type="email"
                      data-parsley-type-message="Formato de correo electronico invalido"
                      data-parsley-required-message="Campo correo requerido"
                      value={pedido.Contacto?.correo}
                      required
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <i className="icn-obligatorio">*</i>
                  <b>Dirección del cliente</b>{" "}
                  <small>(200 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <textarea
                      name="direccion1"
                      id="direccion1"
                      maxLength="200"
                      aria-label="DireccionCliente"
                      placeholder="Ingrese la dirección del cliente"
                      rows="3"
                      class="form-control"
                      data-parsley-required-message="Agregue una direccion"
                      required
                      value={pedido.Contacto.direccion1}
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="col-lg-6">
                  <b>Dirección alternativa</b>{" "}
                  <small>(200 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <textarea
                      name="direccion2"
                      id="direccion2"
                      maxLength="200"
                      aria-label="DireccionCliente"
                      placeholder="Ingrese la dirección del cliente"
                      rows="3"
                      class="form-control"
                      data-parsley-required-message="Agregue una direccion"
                      required
                      value={pedido.Contacto?.direccion2}
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Ciudad</b> <small>(30 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="30"
                      className="form-control"
                      placeholder="Ingrese la ciudad del cliente"
                      aria-label="ciudad"
                      name="ciudad"
                      id="ciudad"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      value={pedido.Contacto?.ciudad}
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                      data-parsley-required-message="Agregue la ciudad del cliente"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Provincia</b> <small>(20 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="20"
                      className="form-control"
                      placeholder="Ingrese la provincia del cliente"
                      aria-label="provincia"
                      name="provincia"
                      id="provincia"
                      value={pedido.Contacto?.provincia}
                      data-parsley-required-message="Agregue la provincia del cliente"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      required
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Código postal</b> <small>(5 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese el código postal del cliente"
                      aria-label="codigo"
                      name="codigo"
                      id="codigo"
                      value={pedido.Contacto?.codigo}
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                      data-parsley-required-message="Agregue el codigo postal"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-length="[5, 5]"
                      data-parsley-length-message="Debe ser 5 dígitos de largo"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Producto(s)</b>
                  <div className="form-group mb-3">
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={productosSlct}
                      onChange={selectProductos}
                      input={<OutlinedInput />}
                    >
                      {productos.map((prod) => (
                        <MenuItem key={prod._id} value={prod._id}>
                          {prod.Nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="row g-0">
                    {productosSlct.length > 0
                      ? pedido.Productos.map((prod, index) => (
                          <div class="card m-3 item">
                            <div class="row g-0">
                              <div class="col" style={{ width: 140 }}>
                                <img
                                  src={prod.imagen}
                                  class="img-fluid rounded-start"
                                  alt="producto"
                                />
                              </div>
                              <div class="col" style={{ width: 200 }}>
                                <div class="card-body">
                                  <p class="card-text">{prod.nombre}</p>
                                  <input
                                    type="number"
                                    className="form-control prod-cant"
                                    min="1"
                                    value={prod.cantidad}
                                    defaultValue={prod.cantidad}
                                    onChange={(e) => {
                                      cambiarCantidad(e, index);
                                    }}
                                  />
                                  <p className="card-text ">
                                    Total:
                                    <strong>
                                      ¢
                                      {parseInt(
                                        prod.precio * prod.cantidad
                                      ).toLocaleString("es")}
                                    </strong>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>

                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Precio</b>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese el precio"
                      aria-label="CostoTotal"
                      name="CostoTotal"
                      id="CostoTotal"
                      value={pedido.CostoTotal}
                      data-parsley-required-message="Campo requerido"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numerico"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      required
                      onChange={editarPedido}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <i className="icn-obligatorio">*</i>
                  <b>Estado del pedido</b>
                  <div className="form-group mb-3">
                    <select
                      className="custom-select"
                      id="Estado"
                      data-parsley-required
                      data-parsley-required-message="Selecione un estado del pedido"
                      name="Estado"
                      onChange={editarPedido}
                    >
                      <option
                        disabled
                        selected
                        value="Selecione el estado del pedido"
                      >
                        Selecione el estado del pedido
                      </option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Enviando">Enviando</option>
                      <option value="Finalizado">Finalizado</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Medio de pago</b>
                  <div className="form-group mb-3">
                    <select
                      className="custom-select"
                      id="MedioPago"
                      data-parsley-required
                      data-parsley-required-message="Selecione un medio de pago"
                      name="MedioPago"
                      onChange={editarPedido}
                    >
                      <option value="Sinpe">Sinpe</option>
                      <option disabled value="Transferencia">
                        Transferencia
                      </option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Identificación</b> <small>(9 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese la identificacion del cliente"
                      aria-label="Identificacion"
                      name="Identificacion"
                      id="Identificacion"
                      onChange={(e) => {
                        editarPedido(e);
                      }}
                      data-parsley-required-message="Agregue una indentificación"
                      data-parsley-length="[9, 9]"
                      data-parsley-length-message="Debe ser 9 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-type="integer"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Número factura</b> <small>(10 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Número de factura de Sinpe"
                      aria-label="NumeroFactura"
                      name="NumeroFactura"
                      id="NumeroFactura"
                      data-parsley-minlength="10"
                      data-parsley-minlength-message="Debe ser minimo 10 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-type="integer"
                      onChange={(e) => {
                        editarPedido(e);
                      }}
                      data-parsley-required-message="Agregue un munero de factura"
                      required
                    />
                  </div>
                </div>

                <div className="col">
                  <button type="submit" className="btn btn-primary btn-block">
                    Agregar Pedido
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={() => {
                      window.location.replace("/Pedidos");
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
