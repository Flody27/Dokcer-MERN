import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";
import Clientes from "./Pages/Clientes/Clientes";
import AgregarCliente from "./Pages/Clientes/AgregarCliente";
import EditarCliente from "./Pages/Clientes/EditarCliente";
import Empleados from "./Pages/Empleados/Empleados";
import AgregarEmpleado from "./Pages/Empleados/AgregarEmpleado";
import EditarEmpleado from "./Pages/Empleados/EditarEmpleado";
import Pagos from "./Pages/Pagos/Pagos";
import AgregarPago from "./Pages/Pagos/AgregarPago";
import EditarPago from "./Pages/Pagos/EditarPago";
import Pedidos from "./Pages/Pedidos/Pedidos";
import AgregarPedido from "./Pages/Pedidos/AgregarPedido";
import EditarPedido from "./Pages/Pedidos/EditarPedido";
import Productos from "./Pages/Productos/Productos";
import AgregarProducto from "./Pages/Productos/AgregarProducto";
import EditarProducto from "./Pages/Productos/EditarProducto";
import Login from "./Pages/Autenticacion/Login";
import NotFound from "./Pages/Error/NotFound";
import Denegado from "./Pages/Error/Denegado";
import InfoCliente from "./Pages/Clientes/InfoCliente";
import InfoEmpleado from "./Pages/Empleados/InfoEmpleado";
import InfoPedido from "./Pages/Pedidos/InfoPedidos";
import InfoProducto from "./Pages/Productos/InfoProductos";
import Categorias from "./Pages/Categorias/Categorias";
import TerminarRegistro from "./Pages/Autenticacion/TerminarRegistro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Empleados" element={<Empleados />} />
        <Route path="/Pagos" element={<Pagos />} />
        <Route path="/Pedidos" element={<Pedidos />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/AgregarPago" element={<AgregarPago />} />
        <Route path="/AgregarCliente" element={<AgregarCliente />} />
        <Route path="/AgregarEmpleado" element={<AgregarEmpleado />} />
        <Route path="/AgregarPedido" element={<AgregarPedido />} />
        <Route path="/AgregarProducto" element={<AgregarProducto />} />
        <Route path="/EditarPago/:id" element={<EditarPago />} />
        <Route path="/EditarCliente/:id" element={<EditarCliente />} />
        <Route path="/EditarEmpleado/:id" element={<EditarEmpleado />} />
        <Route path="/EditarPedido/:id" element={<EditarPedido />} />
        <Route path="/EditarProducto/:id" element={<EditarProducto />} />
        <Route path="/InicioSesion" element={<Login />} />
        <Route path="/Cliente/:id" element={<InfoCliente />} />
        <Route path="/Empleado/:id" element={<InfoEmpleado />} />
        <Route path="/Pedido/:id" element={<InfoPedido />} />
        <Route path="/Producto/:id" element={<InfoProducto />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/TerminarRegistro/:id" element={<TerminarRegistro />} />
        <Route path="/Denegado" element={<Denegado />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
