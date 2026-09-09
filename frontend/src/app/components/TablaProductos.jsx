import Link from "next/link";

/**
 * Presenta los productos en una tabla y permite editarlos o eliminarlos.
 */
function TablaProductos({
  productos,
  obtenerNombreCategoria,
  eliminarProducto,
}) {
  return (
    <table className="min-w-[750px] w-full text-left text-sm">
      <thead className="bg-slate-700 text-white">
        <tr>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Descripción</th>
          <th className="px-4 py-2">Precio</th>
          <th className="px-4 py-2">Stock</th>
          <th className="px-4 py-2">Categoría</th>
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id} className="border-b border-slate-600">
            <td className="px-4 py-2">{producto.nombre}</td>
            <td className="px-4 py-2">{producto.descripcion}</td>
            <td className="px-4 py-2">{producto.precio}</td>
            <td className="px-4 py-2">{producto.stock}</td>
            <td className="px-4 py-2">
              {obtenerNombreCategoria(producto.categoria)}
            </td>
            <td className="px-4 py-2">
              <div className="flex gap-2">
                <Link
                  href={`/editar-producto/${producto.id}`}
                  className="rounded-md bg-slate-600 px-3 py-1 text-white hover:bg-slate-500"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  onClick={() => eliminarProducto(producto.id)}
                  className="rounded-md bg-slate-600 px-3 py-1 text-white hover:bg-slate-500"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaProductos;