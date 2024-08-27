import React from "react";

const PedidosTarjeta = ({
  orden,
  productos,
  estado,
  rutaImagen,
  costo,
  medioPago = "Sinpe",
}) => {
  const colorFondoEstado =
    estado === "Entregado"
      ? "green"
      : estado === "Preparando"
      ? "#4f28d1"
      : "#e7ab3c";

  return (
    <div
      class="card mb-3 col-lg-6 col-md-6 col-sm-6 col-xs-6"
      style={{ maxWidth: 540, borderColor: "#e8e8e8", marginRight: "10px" }}
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src={rutaImagen}
            class="img-fluid rounded-start mt-4"
            alt="productos"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              <strong> Orden</strong> #{orden}
            </h5>
            <p class="card-text">
              Método de pago: <strong> {medioPago} </strong>
            </p>
            <p class="card-text">
              Productos: <strong> {productos} </strong>
            </p>
            <p class="card-text">
              Estado:
              <strong
                style={{
                  color: "white",
                  backgroundColor: colorFondoEstado,
                  padding: "6px 8px",
                  borderRadius: "8px",
                }}
              >
                {estado}
              </strong>
            </p>
            <p className="card-text text-center">
              Costo: <strong>¢{costo}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidosTarjeta;
