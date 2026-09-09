import Link from "next/link";
import ListaProductos from "./components/ListaProductos";

/** Página principal con el listado y accesos a los formularios. */
function Page() {
  return (
    <main className="mx-auto my-8 w-full max-w-7xl px-4">
      <div className="mb-6 flex justify-end gap-2">
        <Link
          href="/crear-producto"
          className="rounded-md bg-slate-600 px-4 py-2 text-white hover:bg-slate-500"
        >
          Crear producto
        </Link>

        <Link
          href="/crear-categoria"
          className="rounded-md bg-slate-600 px-4 py-2 text-white hover:bg-slate-500"
        >
          Crear categoría
        </Link>
      </div>

      <ListaProductos />
    </main>
  );
}

export default Page;