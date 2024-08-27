/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditarPedido() {
  const titulo = "Editar pedido";
  const ruta = process.env.REACT_APP_RUTA_DEV;
  const params = useParams();
  const [pedido, setPedido] = useState({
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
    MedioPago: "",
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

  useEffect(() => {
    if (params.id) obtenerPedido();
  }, []);

  async function obtenerPedido() {
    const res = await axios.get(`${ruta}Pedidos/ObtenerPedido/${params.id}`);
    setPedido(res.data.pedido);
  }

  const editarPedido = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
    $(`#${e.target.id}`).parsley().validate();
  };

  const editarContacto = (e) => {
    setPedido({
      ...pedido,
      Contacto: { ...pedido.Contacto, [e.target.name]: e.target.value },
    });
    $(`#${e.target.id}`).parsley().validate();
  };

  const editar = async (e) => {
    e.preventDefault();

    if (
      !campoValido("nombre") &&
      !campoValido("apellidos") &&
      !campoValido("direccion1") &&
      !campoValido("codigo") &&
      !campoValido("Estado") &&
      !campoValido("provincia") &&
      !campoValido("CostoTotal") &&
      !campoValido("ciudad")
    ) {
      return;
    }

    await axios
      .put(`${ruta}Pedidos/ActualizarPedido/${params.id}`, pedido)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Cambios aplicados con éxito",
          timer: 2000,
        }).then(() => {
          window.location.replace("/Pedidos");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error al aplicar los cambios.",
          html: err.response.data.message,
          timer: 2500,
        });
      });
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
              onSubmit={editar}
            >
              <div className="body row">
                <div className="col-lg-12 my-2">
                  <small>
                    <i className="icn-obligatorio">*</i> Campo obligatorio
                  </small>
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
                      aria-label="nombre"
                      name="nombre"
                      id="nombre"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      value={pedido.Contacto.nombre}
                      data-parsley-required-message="Agregue el nombre del cliente"
                      required
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <i className="icn-obligatorio">*</i>
                  <b>Apellidos</b> <small>(50 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="50"
                      value={pedido.Contacto.apellidos}
                      className="form-control"
                      placeholder="Ingrese los apellidos del cliente"
                      aria-label="apellidos"
                      name="apellidos"
                      id="apellidos"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      data-parsley-required-message="Agregue los apellidos del cliente"
                      required
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Identificacion</b>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      value={pedido.Identificacion}
                      className="form-control cedula"
                      aria-label="Identificacion"
                      name="Identificacion"
                      id="Identificacion"
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Correo electronico</b>{" "}
                  <small>(50 caracteres máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      maxLength="50"
                      className="form-control"
                      aria-label="correo"
                      name="correo"
                      id="correo"
                      value={pedido.Contacto?.correo}
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Teléfono</b> <small>(8 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      className="form-control num-form"
                      placeholder="Ingrese el teléfono del cliente"
                      aria-label="telefono"
                      data-parsley-required-message="Campo requerido"
                      data-parsley-length="[8, 8]"
                      data-parsley-length-message="Debe ser 8 dígitos de largo"
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-type="integer"
                      data-parsley-type-message="Campo numerico"
                      name="telefono"
                      id="telefono"
                      value={pedido.Contacto?.telefono}
                      required
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <b>Producto(s)</b>
                  <div className="row g-0">
                    {pedido.Productos.map((prod) => (
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
                              <p className="card-text ">
                                Total:{" "}
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
                    ))}
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Medio de pago</b>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={pedido.MedioPago}
                      aria-label="MedioPago"
                      name="MedioPago"
                      id="MedioPago"
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <b>Número factura</b>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      value={pedido.NumeroFactura}
                      className="form-control"
                      aria-label="NumeroFactura"
                      name="NumeroFactura"
                      id="NumeroFactura"
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Precio final</b>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      value={pedido.CostoTotal}
                      className="form-control num-form"
                      placeholder="Ingrese el precio del producto"
                      aria-label="CostoTotal"
                      name="CostoTotal"
                      id="CostoTotal"
                      data-parsley-required-message="No deje el precio vacio"
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
                      value={pedido.Estado}
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
                      value={pedido.Contacto.ciudad}
                      className="form-control"
                      placeholder="Ingrese la ciudad del cliente"
                      aria-label="ciudad"
                      name="ciudad"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      id="ciudad"
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
                      value={pedido.Contacto.provincia}
                      className="form-control"
                      placeholder="Ingrese la provincia del cliente"
                      aria-label="provincia"
                      name="provincia"
                      id="provincia"
                      pattern="/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/"
                      data-parsley-pattern-message="No se admite números y caracteres especiales"
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                      data-parsley-required-message="Agregue la provincia del cliente"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <i className="icn-obligatorio">*</i>
                  <b>Código postal</b> <small>(5 dígitos máximo)</small>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      value={pedido.Contacto.codigo}
                      className="form-control num-form"
                      placeholder="Ingrese el código postal del cliente"
                      aria-label="codigo"
                      name="codigo"
                      id="codigo"
                      onChange={(e) => {
                        editarContacto(e);
                      }}
                      data-parsley-required-message="Agregue el codigo postal"
                      required
                      min="0"
                      data-parsley-min-message="Debe ser un valor no negativo"
                      data-parsley-length="[5, 5]"
                      data-parsley-length-message="Debe ser 5 dígitos de largo"
                    />
                  </div>
                </div>

                <div className="col">
                  <button type="submit" className="btn btn-primary btn-block ">
                    Guardar Cambios
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
