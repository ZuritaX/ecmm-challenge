"use client"

import { useEffect, useState } from "react";
import { crearProducto } from "../services/productos";
import { obtenerCategorias } from "../services/categorias";
import { useRouter } from "next/navigation";

/**
 * Formulario para crear productos, validar sus datos y enviarlos a la API.
 * También carga las categorías disponibles y redirige al listado al finalizar.
 */
function FormProducto() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoria, setCategoria] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [errores, setErrores] = useState({});
    const router = useRouter();

    const handleSubmit = async (event) => {
  event.preventDefault();

  const nuevosErrores = {};

  if (nombre.trim().length < 3) {
    nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (precio === "") {
    nuevosErrores.precio = "El precio es obligatorio.";
  } else if (Number(precio) < 0) {
    nuevosErrores.precio = "El precio no puede ser negativo.";
  }

  if (stock === "") {
    nuevosErrores.stock = "El stock es obligatorio.";
  } else if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
    nuevosErrores.stock = "El stock debe ser un número entero positivo.";
  }

  if (!categoria) {
    nuevosErrores.categoria = "Selecciona una categoría.";
  }

  setErrores(nuevosErrores);

  if (Object.keys(nuevosErrores).length > 0) {
    return;
  }

  try {
    await crearProducto({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: Number(precio),
      stock: Number(stock),
      categoria: Number(categoria),
    });

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setCategoria("");
    setErrores({});
    alert("Producto creado correctamente");
    router.push("/");
    router.refresh();
    
  } catch (error) {
    setErrores({ general: error.message });
  }
};
    useEffect(() => {
  async function cargarCategorias() {
    try {
      const datos = await obtenerCategorias();
      setCategorias(datos);
    } catch (error) {
      alert(error.message);
    }
  }

  cargarCategorias();
}, []);

        return (
            <div>
                <form onSubmit={handleSubmit} noValidate>
                <input 
                type="text" 
                placeholder="Nombre del producto" 
                className="bg-slate-400 rounded-md p-2 m-2 text-white placeholder:text-black-400"
                onChange={(event) => setNombre(event.target.value)}
                minLength={3}
                maxLength={100}
                required
                />
                {errores.nombre && (
                <p className="text-sm text-red-300">{errores.nombre}</p>
                )}    
                <input 
                type="text" 
                placeholder="Descripción del producto" 
                className="bg-slate-400 rounded-md p-2 m-2 text-white placeholder:text-black-400"
                onChange={(event) => setDescripcion(event.target.value)}
                />
                <input 
                type="number" 
                placeholder="Precio del producto" 
                className="bg-slate-400 rounded-md p-2 m-2 text-white placeholder:text-black-400"
                onChange={(event) => setPrecio(event.target.value)}
                min="0"
                required
                />
                {errores.precio && (
                <p className="text-sm text-red-300">{errores.precio}</p>
                )}

                <input 
                type="number" 
                placeholder="Stock del producto" 
                className="bg-slate-400 rounded-md p-2 m-2 text-white placeholder:text-black-400"
                onChange={(event) => setStock(event.target.value)}
                min="0"
                required
                />
                {errores.stock && (
                <p className="text-sm text-red-300">{errores.stock}</p>
                )}

                <select
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
                className="bg-slate-400 rounded-md p-2 m-2 text-white"
                required
                >
                <option value="">Selecciona una categoría</option>

                {categorias.map((categoriaItem) => (
                    <option key={categoriaItem.id} value={categoriaItem.id}>
                    {categoriaItem.nombre}
                    </option>
                ))}
                </select>

                {errores.categoria && (
                <p className="text-sm text-red-300">{errores.categoria}</p>
                )}

                {errores.general && (
                <p className="text-sm text-red-300">{errores.general}</p>
                )}

                <button type="submit" className="bg-slate-600 text-white rounded-md p-2 m-2 hover:bg-slate-500">
                    Agregar Producto
                </button>
                </form>
            </div>
        );
    }       

    export default FormProducto;