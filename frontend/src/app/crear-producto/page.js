import Link from "next/link";
import FormProducto from "../components/FormProducto";

/** Página que contiene el formulario para crear productos. */
function CrearProductoPage() {
  return (
    <main className="container mx-auto max-w-7xl p-4">
      
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Crear producto</h1>

        <Link
          href="/"
          className="rounded-md bg-slate-600 px-4 py-2 text-white hover:bg-slate-700"
        >
          Volver al listado
        </Link>
      </div>

      <div className="mx-auto w-full rounded-lg bg-slate-700 p-6 md:w-1/2">
        <FormProducto />
      </div>
    </main>
  );
}

export default CrearProductoPage;