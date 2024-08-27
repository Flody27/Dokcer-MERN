// Plantilla principal del correo electronico
function MainCorreo(contenido) {
  return `
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>La Miel de Pao</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f7f7f7;
          }
  
          .header {
              max-width: 600px;
              margin: 0 auto;
              background: #FDC830;
              background: -webkit-linear-gradient(to right, #F37335, #FDC830);
              background: linear-gradient(to right, #F37335, #FDC830);
              padding: 30px;
              text-align: center;
              color: #ffffff;
          }
  
          .header h1 {
              font-size: 28px;
              margin-bottom: 10px;
          }
  
          .content {
              max-width: 600px;
              margin: 0 auto;
              padding: 30px;
              background-color: #ffffff;
          }
  
          .content p {
              font-size: 16px;
              color: #333333;
              line-height: 1.8;
              margin-bottom: 20px;
          }
    
          .button-container {
              text-align: center;
          }
  
          .button {
              display: inline-block;
              background: #FDC830;
              background: -webkit-linear-gradient(to right, #F37335, #FDC830);
              background: linear-gradient(to right, #F37335, #FDC830);
              padding: 10px 20px;
              border: none;
              border-radius: 4px;
              text-decoration: none;
              color: #ededed;
          }
  
          .footer {
              max-width: 600px;
              margin: 0 auto;
              background-color: #f2f2f2;
              padding: 30px;
              text-align: center;
              color: #777777;
              font-size: 12px;
          }
  
          .footer a {
              color: #f7ba11;
              text-decoration: none;
              border-bottom: 1px dotted #f7ba11;
              transition: border-bottom 0.2s ease-in-out;
          }
  
          .footer a:hover {
              border-bottom: 1px solid #f7ba11;
          }
      </style>
  </head>
  
  <body>
      <div class="header">
          <h1>La Miel de Pao</h1>
      </div>
  
      <div class="content">
          ${contenido}
      </div>
  
      <div class="footer">
          <p>Revisa nuestro catálogo de productos <a href="http://localhost:3000/">ver tienda</a></p>
          <p>La Miel de Pao | Teléfono: 506 6028-2364 | Email: <a
                  href="mailto:lamieldepao28@gmail.com">lamieldepao28@gmail.com</a></p>
      </div>
  </body>
  
  </html>
 `;
}

// TODO: Cambiar el links por el dominio de la tienda o panel de administracion

exports.CorreoActivacion = (Cliente, link) => {
  let contenido = `
    <p>Hola, ${Cliente}</p>
 
    <p>Gracias por registrarse en nuestra página.</p>
    <p>Pero primero debes confirmar la creación de tu cuenta, lo cual es necesario para iniciar sesión en la tienda
        en línea, para ello confirma la cuenta en la siguiente página.</p>
    <div class="button-container">
        <a class="button" href="${link}">Confirma la cuenta acá</a>
    </div>
    `;
  return MainCorreo(contenido);
};

exports.RecordatorioPago = (PagosPendientes) => {
  let contenido = `
  <h2>Recordatorio de pagos por hacer</h2>
  <p>Recordar realizar los siguientes pagos pendientes:</p>
  <ul>
      ${PagosPendientes.map(
        (pago) =>
          `<li>Pagar ${pago.Entidad}  el ${fecha(
            pago.FechaLimite
          )}, monto a pagar ¢${pago.Monto.toLocaleString("es")}.</li>`
      )}
  </ul>`;

  return MainCorreo(contenido);
};

exports.CorreoPedido = (Productos, linkPedido, PrecioFinal) => {
  let contenido = `
    <h2>Confirmación del pedido</h2>
    <p>Gracias por comprar con nosotros su pedido está en proceso a continuación detalles del pedido</p>
    <h4>Productos</h4>
    <ul>
    ${Productos.map(
      (prod) =>
        `<li>${prod.nombre} - Cantidad: ${prod.cantidad} - Precio: ¢${prod.precio}: - <a href="${process.env.URL_TIENDA}producto/${prod.id}">detalle del producto</a> </li>`
    )}
    </ul>
    <h4>Monto a pagar: ¢${PrecioFinal}</h4>
    <div class="button-container">
        <a class="button" href="${linkPedido}">Ver detalles</a>
    </div>
    `;

  return MainCorreo(contenido);
};

exports.CorreoOrden = (
  Productos,
  Cliente,
  Factura,
  Identificacion,
  linkPedido,
  PrecioFinal
) => {
  let contenido = `
  <h2>Orden entrante - SINPE</h2>
  <h4>Cliente</h4>
  <ul>
      <li>Nombre completo: ${Cliente.nombre} ${Cliente.apellidos}</li>
      <li>Teléfono: ${Cliente.telefono}</li>
      <li>Correo electrónico: ${Cliente.correo}</li>
      <li>Identificación: ${Identificacion}</li>
      <li>Número factura SINPE: ${Factura}</li>
      <li>Provincia: ${Cliente.provincia}</li>
      <li>Ciudad: ${Cliente.ciudad}</li>
      <li>Código postal: ${Cliente.codigo}</li>
      <li>Dirección: ${Cliente.direccion1}</li>
      <li>Dirección 2: ${Cliente?.direccionAlt}</li>
      <li>Monto de pedido: ¢${PrecioFinal}</li>
  </ul>
  <h4>Productos</h4>
  <ul>
  ${Productos.map(
    (prod) =>
      `<li>${prod.nombre} - Cantidad: ${prod.cantidad} - Precio: ${prod.precio}: - <a href="${process.env.URL_ADMIN}producto/${prod.id}">detalle del producto</a> </li>`
  )}
  </ul>
  <div class="button-container">
      <a class="button" href="${linkPedido}">Ver pedido</a>
  </div>
  `;

  return MainCorreo(contenido);
};

exports.CorreoPedidoEnviado = (Productos, linkPedido, PrecioFinal, Fecha) => {
  let contenido = `
  <h2>Su pedido se esta enviando</h2>
  <p>Le informamos que su pedido realizado el ${Fecha} se esta enviando</p>
  <h4>Productos</h4>
  <ul>
  ${Productos.map(
    (prod) =>
      `<li>${prod.nombre} - Cantidad: ${prod.cantidad} - Precio: ¢${prod.precio}: - <a href="${process.env.URL_TIENDA}producto/${prod.id}">detalle del producto</a> </li>`
  )}
  </ul>
  <h4>Monto a pagar: ¢${PrecioFinal}</h4>
  <div class="button-container">
      <a class="button" href="${linkPedido}">Ver detalles</a>
  </div>
  `;

  return MainCorreo(contenido);
};

exports.CorreoPedidoFinalizado = (Productos, linkPedido) => {
  let contenido = `
  <h2>Su pedido ha finalizado</h2>
  <p>Gracias por comprar con nosotros, nos seria de mucha ayuda si nos dejas una reseña de los productos adquiridos.</p>
  <h4>Productos</h4>
  <ul>
  ${Productos.map(
    (prod) =>
      `<li>${prod.nombre} - <a href="${process.env.URL_TIENDA}producto/${prod.id}">opina del producto</a> </li>`
  )}
  </ul>
  <div class="button-container">
    <a class="button" href="${linkPedido}">Ver detalles</a>
  </div>
  `;

  return MainCorreo(contenido);
};

exports.CorreoPedidoCancelado = (linkPedido) => {
  let contenido = `
  <h2>Lo sentimos su pedido ha sido cancelado.</h2>
  <p>Si no has solicitado cancelar el pedido, ponte en contacto con la tienda para resolver el inconveniente.</p>
  <div class="button-container">
    <a class="button" href="${linkPedido}">Ver pedido</a>
  </div>
  `;

  return MainCorreo(contenido);
};

exports.CorreoPedidoPendiente = (linkPedido) => {
  let contenido = `
  <h2>Su pedido esta pendiente.</h2>
  <p>De momento no se puede preparar su pedido, no se preocupe, se le notificará cuando este se pueda preparar sin problemas.</p>
  <div class="button-container">
    <a class="button" href="${linkPedido}">Ver pedido</a>
  </div>
  `;

  return MainCorreo(contenido);
};

exports.CorreoCambioCredenciales = (Codigo) => {
  let contenido = `
  <h2>Se solicto un cambio de contraseña.</h2>
  <p>Este el código de confirmación de cambio de contraseña</p>
  <h4>${Codigo}</h4>
  <p>Si no solicito un cambio de contraseña, por favor comunicarse con la tienda.</p>
  `;

  return MainCorreo(contenido);
};

exports.CompletarRegistro = (Usuario, link, Codigo) => {
  let contenido = `
  <p>Hola , ${Usuario}</p>
  <p>Se le ha registrado a nuestro sitio web, por favor para terminar su registro ocupamos que termine de
      completar los datos solicitado , si no realizo una solicitud de registro comuniquese con la tienda.</p>
  <h4>Codigo de confirmación: ${Codigo}</h4>
  <div class="button-container">
      <a class="button" href="${link}">Terminar registro acá</a>
  </div>
  `;

  return MainCorreo(contenido);
};

const fecha = (fecha) => {
  let temp = new Date(fecha);
  let dia = temp.getDate() + 1;
  let mes = temp.getMonth() + 1;
  let year = temp.getFullYear();
  return `${dia}/${mes}/${year}`;
};
