"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { crearCategoria } from "../services/categorias";

/** Página para validar y crear una categoría. */
function CrearCategoriaPage() {
  const [nombre, setNombre] = useState("");
  const [errores, setErrores] = useState({});
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const nombreCategoria = nombre.trim();

    if (nombreCategoria.length < 2) {
      setErrores({
        general: "La categoría debe tener al menos 2 caracteres.",
      });
      return;
    }

    try {
      await crearCategoria(nombreCategoria);
      alert("Categoría creada correctamente");
      router.push("/");
      router.refresh();
    } catch (error) {
      setErrores({ general: error.message });
    }
  }

  return (
    <main className="container mx-auto max-w-7xl p-4">
  <div className="mb-6 flex items-center justify-between">
    <h1 className="text-2xl font-bold">Crear categoría</h1>

    <Link
      href="/"
      className="rounded-md bg-slate-600 px-4 py-2 text-white hover:bg-slate-700"
    >
      Volver al listado
    </Link>
  </div>

  <div className="mx-auto w-full max-w-md rounded-lg bg-slate-700 p-6">
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="nombre" className="mb-2 block">
        Nombre de la categoría
      </label>

      <input
        id="nombre"
        type="text"
        value={nombre}
        onChange={(event) => setNombre(event.target.value)}
        minLength={2}
        maxLength={100}
        className="mb-4 w-full rounded-md bg-slate-400 px-4 py-2 text-white"
        required
      />

      {errores.general && (
        <p className="mb-4 text-sm text-red-300">{errores.general}</p>
      )}

      <button
        type="submit"
        className="rounded-md bg-slate-600 px-4 py-2 text-white hover:bg-slate-500"
      >
        Crear categoría
      </button>

    </form>
  </div>
</main>
  );
}

export default CrearCategoriaPage;