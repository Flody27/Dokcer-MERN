import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section mt-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="footer-left">
              <div className="footer-logo">
                <a href="#">La Miel de Pao</a>
              </div>
              <ul>
                <li>Dirección: Cartago, Costa Rica</li>
                <li>Teléfono: +506 6028-2364</li>
                <li>Correo electrónico: lamieldepao28@gmail.com</li>
              </ul>
              <div className="footer-social">
                <a href="https://www.facebook.com/lamieldepaocostarica/?locale=es_LA">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/lamieldepaocostarica/">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="https://wa.me/50660282364">
                  <i className="fa fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-2 offset-lg-1">
            <div className="footer-widget">
              <h5>Información</h5>
              <ul>
                <li>
                  <a href="#">Sobre Nosotros</a>
                </li>
                <li>
                  <a href="#">Contacto</a>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="col-lg-2">
            <div className="footer-widget">
              <h5>Mi cuenta</h5>
              <ul>
                <li>
                  <a href="/perfil">Mi perfil</a>
                </li>
                <li>
                  <a href="/carrito">Carrito de compras</a>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="col-lg-4">
            <div className="newslatter-item">
              <h5>Unite a nuesta comunidad</h5>
              <p>
                Recibí información de nuestras ofertas por medio de correo
                electrónico.
              </p>
              <form action="#" className="subscribe-form">
                <input
                  type="text"
                  placeholder="Ingresá tu correo electrónico"
                />
                <button type="button">Subscribirse</button>
              </form>
            </div>
          </div> */}
        </div>
      </div>
      <div className="copyright-reserved">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-text">
                Copyright &copy;
                <script>document.write(new Date().getFullYear());</script> Todos
                los derechos reservados.
              </div>
              {/* <div className="payment-pic">
                <img src="assets/img/payment-method.png" alt="" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
