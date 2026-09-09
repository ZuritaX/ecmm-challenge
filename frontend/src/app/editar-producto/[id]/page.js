"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  actualizarProducto,
  obtenerProductos,
} from "../../services/productos";
import { obtenerCategorias } from "../../services/categorias";

/** Página dinámica para cargar y actualizar un producto por su ID. */
function EditarProductoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [producto, setProducto] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

 useEffect(() => {
  async function cargarDatos() {
    try {
      const [productos, categoriasData] = await Promise.all([
        obtenerProductos(),
        obtenerCategorias(),
      ]);

      const productoEncontrado = productos.find(
        (productoItem) => String(productoItem.id) === String(id)
      );

      setProducto(productoEncontrado);
      setCategorias(categoriasData);
    } catch (error) {
      setMensaje(error.message);
    }
  }

  if (id) {
    cargarDatos();
  }
}, [id]);

  function actualizarCampo(event) {
    const { name, value } = event.target;

    setProducto((productoActual) => ({
      ...productoActual,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
  event.preventDefault();

  try {
    await actualizarProducto(id, {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
    });

    router.push("/");
  } catch (error) {
    setMensaje(error.message);
  }
}
  if (!producto) {
    return <p className="p-8">Cargando producto...</p>;
  }

  return (
    <main className="mx-auto my-8 w-full max-w-7xl px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editar producto</h1>

        <Link
          href="/"
          className="rounded-md bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
        >
          Volver al listado
        </Link>
      </div>

      <div className="mx-auto w-full max-w-md rounded-lg bg-slate-700 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="nombre"
            value={producto.nombre}
            onChange={actualizarCampo}
            placeholder="Nombre del producto"
            className="rounded-md bg-slate-400 px-4 py-2 text-white"
            required
          />

          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={actualizarCampo}
            placeholder="Descripción del producto"
            className="rounded-md bg-slate-400 px-4 py-2 text-white"
            required
          />

          <input
            name="precio"
            type="number"
            step="0.01"
            value={producto.precio}
            onChange={actualizarCampo}
            placeholder="Precio"
            className="rounded-md bg-slate-400 px-4 py-2 text-white"
            required
          />

          <input
            name="stock"
            type="number"
            value={producto.stock}
            onChange={actualizarCampo}
            placeholder="Stock"
            className="rounded-md bg-slate-400 px-4 py-2 text-white"
            required
          />

          <select
            name="categoria"
            value={producto.categoria}
            onChange={actualizarCampo}
            className="rounded-md bg-slate-400 px-4 py-2 text-white"
            required
          >
            <option value="">Selecciona una categoría</option>

            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded-md bg-slate-600 px-4 py-2 text-white hover:bg-slate-500"
          >
            Guardar cambios
          </button>

          {mensaje && <p>{mensaje}</p>}
        </form>
      </div>
    </main>
  );
}

export default EditarProductoPage;