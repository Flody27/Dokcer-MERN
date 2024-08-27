import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contacto from "./pages/Contacto";
import Pedidos from "./pages/Pedidos";
import Error404 from "./pages/Error404";
import Productos from "./pages/Productos";
import Producto from "./pages/Producto";
import Carrito from "./pages/Carrito";
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import RestablecerContraseña from "./pages/RestablecerContraseña";
import Cart from "./Context/CarritoContext";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Checkout from "./pages/Checkout";
import TerminarRegistro from "./pages/TerminarRegistro";

function App() {
  return (
    <Cart>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/contacto" element={<Contacto />} /> */}
          <Route path="/registrarse" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ConfirmarCuenta/:id" element={<ConfirmarCuenta />} />
          <Route
            path="/restablecercontraseña"
            element={<RestablecerContraseña />}
          />
          <Route path="/TerminarRegistro/:id" element={<TerminarRegistro />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editar/:id" element={<EditarPerfil />} />

          {/* PRODUCTOS */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<Producto />} />

          {/* DE ULTIMA */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </Cart>
  );
}

export default App;
