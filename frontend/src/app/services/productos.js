const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Centraliza las operaciones de productos contra la API de Django.

/** Obtiene todos los productos. */
export async function obtenerProductos() {
  const response = await fetch(`${API_URL}/api/productos/`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  return response.json();
}

/** Elimina un producto por su identificador. */
export async function eliminarProductoPorId(id) {
  const response = await fetch(`${API_URL}/api/productos/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el producto");
  }
}

/** Crea un producto con los datos recibidos del formulario. */
export async function crearProducto(producto) {
  const response = await fetch(`${API_URL}/api/productos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el producto");
  }

  return response.json();
}

/** Actualiza los datos de un producto existente. */
export async function actualizarProducto(id, producto) {
  const response = await fetch(`${API_URL}/api/productos/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el producto");
  }

  return response.json();
}