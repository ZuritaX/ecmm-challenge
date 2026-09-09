/**
 * Muestra los controles para buscar productos y filtrar por categoría.
 */
function FiltrosProductos({
  busqueda,
  setBusqueda,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  categorias,
}) {
  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row">
      <input
        type="search"
        placeholder="Buscar por nombre, descripción o categoría..."
        value={busqueda}
        onChange={(event) => setBusqueda(event.target.value)}
        className="w-full flex-1 rounded-md bg-slate-400 px-4 py-2 text-white placeholder:text-slate-200"
      />

      <select
        value={categoriaSeleccionada}
        onChange={(event) => setCategoriaSeleccionada(event.target.value)}
        className="w-full rounded-md bg-slate-400 px-4 py-2 text-white sm:w-auto"
      >
        <option value="">Todas las categorías</option>

        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
export default FiltrosProductos;