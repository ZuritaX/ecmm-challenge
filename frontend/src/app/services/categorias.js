const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Centraliza las operaciones de categorías contra la API de Django.

/** Obtiene las categorías disponibles. */
export async function obtenerCategorias() {
  const response = await fetch(`${API_URL}/api/categorias/`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar las categorías");
  }

  return response.json();
}

/** Crea una categoría con el nombre recibido. */
export async function crearCategoria(nombre) {
  const response = await fetch(`${API_URL}/api/categorias/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre }),
  });

  const datos = await response.json();

  if (!response.ok) {
    const mensaje = Object.entries(datos)
      .map(([campo, mensajes]) => `${campo}: ${mensajes}`)
      .join(" | ");

    throw new Error(mensaje || "No se pudo crear la categoría");
  }

  return datos;
}