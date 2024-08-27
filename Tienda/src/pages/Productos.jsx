/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VistaRapida from "../components/VistaRapida";
import ProductosTarjeta from "../components/ProductosTarjeta";
import axios from "axios";
import {
  Slider,
  Select,
  MenuItem,
  TextField,
  Box,
  IconButton,
} from "@mui/material";

const Productos = () => {
  const ruta = process.env.REACT_APP_RUTA_DEV;

  const [respuesta, setRespuesta] = useState([]);
  const [busqueda, setBusqueda] = useState();
  const [btnBorraFiltro, setBtnBorrarFiltro] = useState(true);
  const [productos, setProductos] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [precioMax, setPrecioMax] = useState(0);
  const [precioMin, setPrecioMin] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [categoriaLabel, setCategoriaLabel] = useState("");
  const [ordenProd, setOrdenProd] = useState("def");
  const [categorias, setCategorias] = useState([
    {
      _id: "",
      Categoria: "",
    },
  ]);

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaLabel("def");
  }, [Select]);

  useEffect(() => {
    setPrecios(respuesta.map((prod) => prod.Precio));
  }, [respuesta]);

  useEffect(() => {
    obtenerPrecios();
  }, [precios]);

  function obtenerProductos() {
    axios
      .get(ruta + "Productos/ObtenerProductos")
      .then((resp) => {
        let res = resp.data.productos;
        setRespuesta(res.filter((item) => item.Cantidad > 0));
        setProductos(res.filter((item) => item.Cantidad > 0));
      })
      .catch((err) => console.log(err));
  }

  async function obtenerCategorias() {
    let res = await axios.get(
      `${process.env.REACT_APP_RUTA_DEV}BuscarCategorias`
    );
    setCategorias(res.data);
  }

  function filtro(btn) {
    setPrecio(precioMin);
    setOrdenProd("def");

    let categoria = btn.target.value;
    setCategoriaLabel(categoria);

    setBtnBorrarFiltro(false);
    setBusqueda("");

    let nuevoArray = respuesta.filter(
      (producto) => producto.Categoria === categoria
    );

    setProductos(nuevoArray);
  }

  function reordenarProductos(val) {
    if (!btnBorraFiltro) {
      setProductos(respuesta);
      setBtnBorrarFiltro(true);
      setCategoriaLabel("def");
    }

    setPrecio(precioMin);

    setBusqueda("");

    let estado = val.target.value;

    if (estado === "def") {
      setOrdenProd(estado);
      return setProductos(respuesta);
    }

    const nuevoArray = [...respuesta];

    nuevoArray.sort((a, b) => {
      if (estado === "asc") {
        return b.Precio - a.Precio;
      }
      if (estado === "dsc") {
        return a.Precio - b.Precio;
      }
    });

    setOrdenProd(estado);
    return setProductos(nuevoArray);
  }

  function obtenerPrecios() {
    const precioMasBajo = Math.min(...precios);
    const precioMasAlto = Math.max(...precios);
    setPrecioMax(precioMasAlto);
    setPrecioMin(precioMasBajo);
    setPrecio(precioMasBajo);
  }

  function filtrarPrecio(sld) {
    if (!btnBorraFiltro) {
      setProductos(respuesta);
      setBtnBorrarFiltro(true);
      setCategoriaLabel("def");
    }

    if (ordenProd !== "def") {
      setOrdenProd("def");
    }

    setBusqueda("");

    let valor = sld.target.value;
    setPrecio(valor);
    let nuevoArray = respuesta.filter((producto) => producto.Precio >= valor);
    setProductos(nuevoArray);
  }

  function buscar(e) {
    if (!btnBorraFiltro) {
      setProductos(respuesta);
      setBtnBorrarFiltro(true);
      setCategoriaLabel("def");
    }

    if (ordenProd !== "def") {
      setOrdenProd("def");
    }

    setPrecio(precioMin);

    let entrada = e.target.value.toLowerCase().trim();
    setBusqueda(entrada);
    if (entrada === "") {
      return setProductos(respuesta);
    }
    const expresionRegular = new RegExp(entrada, "i");
    let resultados = respuesta.filter((prod) =>
      expresionRegular.test(prod.Nombre.toLowerCase().trim())
    );
    setProductos(resultados);
  }

  return (
    <>
      <Navbar title="Productos" />
      <section className="product-shop spad">
        <div className="container">
          <div className="row">
            {/* Filtros */}
            <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter responsive-invisble">
              <div className="filter-widget">
                <h4 className="fw-title">Categoría</h4>
                <Select size="small" value={categoriaLabel} onChange={filtro}>
                  <MenuItem value={"def"} disabled>
                    Categorías
                  </MenuItem>
                  {categorias.map((cat) => (
                    <MenuItem value={cat.Categoria}>{cat.Categoria}</MenuItem>
                  ))}
                </Select>
                <button
                  className="btn-no-flt mx-2"
                  hidden={btnBorraFiltro}
                  onClick={() => {
                    setProductos(respuesta);
                    setBtnBorrarFiltro(true);
                    setCategoriaLabel("def");
                  }}
                  value="borrar"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
              <div className="filter-widget">
                <h4 className="fw-title">Precio</h4>
                <p>Precio: ¢{precio.toLocaleString("es")}</p>
                <div className="filter-range-wrap">
                  <Slider
                    defaultValue={precioMin}
                    aria-label="Default"
                    value={precio}
                    onChange={filtrarPrecio}
                    valueLabelDisplay="auto"
                    sx={{
                      width: 150,
                      color: "#e7ab3c",
                    }}
                    max={precioMax}
                    min={precioMin}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-9 order-1 order-lg-2">
              <div className="product-show-option responsive-invisble">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <Select
                      size="small"
                      value={ordenProd}
                      onChange={reordenarProductos}
                    >
                      <MenuItem value={"def"}>Orden por defecto</MenuItem>
                      <MenuItem value={"asc"}>
                        Por precio mayor a menor
                      </MenuItem>
                      <MenuItem value={"dsc"}>
                        Por precio menor a mayor
                      </MenuItem>
                    </Select>
                  </div>
                  <div className="col-lg-8 col-md-8">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <i className="ti-search mx-2"></i>
                      <TextField
                        id="input-with-icon-textfield"
                        label="Buscar producto"
                        variant="standard"
                        value={busqueda}
                        onChange={buscar}
                      />
                    </Box>
                  </div>
                </div>
              </div>
              <div className="product-show-option responsive-show">
                <div className="row">
                  <div className="col-sm-12 my-2">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <i className="ti-search mx-2"></i>
                      <TextField
                        id="input-with-icon-textfield"
                        label="Buscar producto"
                        variant="standard"
                        value={busqueda}
                        onChange={buscar}
                      />
                    </Box>
                  </div>
                  <div className="col-sm-12 my-2">
                    <Select
                      size="small"
                      value={ordenProd}
                      onChange={reordenarProductos}
                    >
                      <MenuItem value={"def"}>Orden por defecto</MenuItem>
                      <MenuItem value={"asc"}>
                        Por precio mayor a menor
                      </MenuItem>
                      <MenuItem value={"dsc"}>
                        Por precio menor a mayor
                      </MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="product-list">
                <div className="row">
                  {productos.map((producto) => {
                    return (
                      <>
                        <ProductosTarjeta
                          key={producto._id}
                          producto={producto}
                        />
                        <VistaRapida
                          key={producto._id + "1"}
                          producto={producto}
                        />
                      </>
                    );
                  })}
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

export default Productos;
