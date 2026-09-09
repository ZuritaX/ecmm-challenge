"use client";

import { useEffect, useState } from "react";

import FiltrosProductos from "./FiltrosProductos";
import TablaProductos from "./TablaProductos";
import Paginacion from "./Paginacion";
import {
  obtenerProductos,
  eliminarProductoPorId,
} from "../services/productos";
import { obtenerCategorias } from "../services/categorias";

const PRODUCTOS_POR_PAGINA = 10;

/**
 * Coordina la carga, búsqueda, filtrado por categoría y paginación de productos.
 * También conecta la tabla con las acciones de editar y eliminar registros.
 */
function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  async function eliminarProducto(id) {
  const confirmar = window.confirm(
    "¿Seguro que deseas eliminar este producto?"
  );

  if (!confirmar) return;

  try {
    await eliminarProductoPorId(id);

    setProductos((productosActuales) =>
      productosActuales.filter((producto) => producto.id !== id)
    );
  } catch (error) {
    alert(error.message);
  }
}

 useEffect(() => {
  async function cargarDatos() {
    try {
      const [productosData, categoriasData] = await Promise.all([
        obtenerProductos(),
        obtenerCategorias(),
      ]);

      setProductos(productosData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error(error);
    }
  }

  cargarDatos();
}, []);

  function cambiarBusqueda(valor) {
    setBusqueda(valor);
    setPaginaActual(1);
  }

  function cambiarCategoria(valor) {
    setCategoriaSeleccionada(valor);
    setPaginaActual(1);
  }

  const obtenerNombreCategoria = (categoriaId) => {
    const categoria = categorias.find(
      (categoriaItem) => categoriaItem.id === categoriaId
    );

    return categoria?.nombre || "Sin categoría";
  };

  const productosFiltrados = productos.filter((producto) => {
    const texto = busqueda.trim().toLowerCase();
    const nombreCategoria = obtenerNombreCategoria(producto.categoria);

    const coincideTexto =
      String(producto.nombre ?? "").toLowerCase().includes(texto) ||
      String(producto.descripcion ?? "").toLowerCase().includes(texto) ||
      nombreCategoria.toLowerCase().includes(texto);

    const coincideCategoria =
      categoriaSeleccionada === "" ||
      String(producto.categoria) === categoriaSeleccionada;

    return coincideTexto && coincideCategoria;
  });

  const totalPaginas = Math.ceil(
    productosFiltrados.length / PRODUCTOS_POR_PAGINA
  );

  const indiceInicial = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;

  const productosPagina = productosFiltrados.slice(
    indiceInicial,
    indiceInicial + PRODUCTOS_POR_PAGINA
  );

  return (
    <div className="mx-auto my-4 w-full max-w-7xl px-0 sm:my-8 sm:px-4">
    <h1 className="mb-4 text-lg font-bold sm:text-xl">
      Lista de Productos
    </h1>

        <FiltrosProductos
  busqueda={busqueda}
  setBusqueda={cambiarBusqueda}
  categoriaSeleccionada={categoriaSeleccionada}
  setCategoriaSeleccionada={cambiarCategoria}
  categorias={categorias}
/>


      <TablaProductos
  productos={productosPagina}
  obtenerNombreCategoria={obtenerNombreCategoria}
  eliminarProducto={eliminarProducto}
/>

     <Paginacion
  paginaActual={paginaActual}
  totalPaginas={totalPaginas}
  cambiarPagina={setPaginaActual}
  mostrar={productosFiltrados.length > PRODUCTOS_POR_PAGINA}
/>

    </div>
  );
} 

export default ListaProductos;