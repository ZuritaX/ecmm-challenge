/**
 * Permite cambiar de página y se oculta cuando todos los productos caben en una sola página.
 */

function Paginacion({
  paginaActual,
  totalPaginas,
  cambiarPagina,
  mostrar,
}) {
  if (!mostrar) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => cambiarPagina((pagina) => pagina - 1)}
        disabled={paginaActual === 1}
        className="rounded-md bg-slate-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Anterior
      </button>

      <span>
        Página {paginaActual} de {totalPaginas}
      </span>

      <button
        type="button"
        onClick={() => cambiarPagina((pagina) => pagina + 1)}
        disabled={paginaActual >= totalPaginas}
        className="rounded-md bg-slate-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Paginacion;