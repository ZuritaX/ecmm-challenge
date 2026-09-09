# Prueba técnica Junior Fullstack

Construye una aplicación sencilla para administrar un catálogo de productos. La
solución debe incluir una API REST en Django y una interfaz web que la consuma.

**Tiempo estimado de desarrollo:** 90 minutos.

Este tiempo es una referencia para dimensionar el alcance y no un límite de
ejecución. Se recomienda priorizar una solución simple, funcional y clara.

## Alcance

### API

La API debe permitir:

- Listar productos y consultar uno por su ID.
- Crear, editar y eliminar productos.
- Filtrar productos por categoría.
- Buscar productos por nombre.

Una **categoría** debe contener:
- nombre


Un **producto** debe contener:
- nombre
- descripción
- precio
- stock
- categoría
- fecha de creación

### Interfaz web

La interfaz debe permitir, como mínimo:

- Visualizar el listado de productos.
- Crear un producto mediante un formulario.
- Filtrar o buscar productos.

Puedes utilizar Next.js u otro framework basado en React. La elección queda a tu
criterio y debe ser adecuada al alcance de la solución.

## Reglas

- El backend debe utilizar Django y Django REST Framework.
- La base de datos debe ser SQLite.
- El nombre de cada categoría debe ser único.
- Nombre, precio, stock y categoría son obligatorios.
- El precio debe ser mayor o igual a cero.
- El stock debe ser un entero mayor o igual a cero.
- La categoría asociada debe existir.
- Los errores de validación deben devolver una respuesta HTTP apropiada y comprensible.

No se requiere autenticación, carrito de compras, órdenes, pagos ni despliegue.

## Entregables

- API e interfaz web funcionales.
- Migraciones de base de datos.
- Al menos dos pruebas automatizadas: creación correcta de un producto y rechazo
  de datos inválidos.
- Instrucciones completas para ejecutar el proyecto.

La organización de endpoints y la elección de herramientas adicionales quedan a
criterio del postulante.

## Uso de herramientas de IA

Puedes utilizar herramientas de IA como apoyo. Si lo haces, indícalo brevemente
en tus anotaciones junto con el propósito para el que las utilizaste. Debes
comprender todo el código presentado; estas herramientas no reemplazan el dominio
de la solución.

## Proceso de entrega

Realiza un fork de este repositorio y desarrolla allí tu solución. Al finalizar,
comparte el enlace público al fork según las instrucciones recibidas.

El plazo para enviar la solución es de **cinco días corridos** desde la recepción
de la prueba. Una vez vencido ese plazo, no se recibirán nuevas entregas.

## Criterios de evaluación

- Cumplimiento de los requisitos y funcionamiento de los endpoints.
- Uso adecuado de modelos, serializers y vistas.
- Integración entre la interfaz y la API.
- Elección de herramientas acorde con el alcance solicitado.
- Claridad, organización y comprensión del código.
- Calidad de las validaciones, pruebas y documentación.

---

## Anotaciones del postulante

Completa este espacio antes de entregar tu solución.

### Instrucciones de ejecución

=========== Comandos necesarios Backend =======================================
pip install -r requirements.txt (En este caso se uso miniconda pero usar gestor de paquetes a conveniencia)
python manage.py makemigrations
python manage.py migrate
python manage.py test 
python manage.py Runserver


Filtro por producto http://localhost:8000/api/productos/?search=018
Filtro por Categoria http://localhost:8000/api/productos/?categoria=2

=========== Comandos necesarios Frotend =======================================
npm install
npm run dev




## Decisiones y observaciones

### Decisiones técnicas

Opté por una sola app de Django (`catalogo`) en vez de separar productos y categorías en apps distintas. Al final Producto depende directamente de Categoria, así que separarlas solo iba a agregar imports cruzados y configuración extra sin necesidad real para un catálogo de este tamaño.

En la relación entre Producto y Categoria usé `on_delete=PROTECT`. Como categoría es obligatoria, no tenía sentido permitir que al borrar una categoría sus productos quedaran sin categoría (`SET_NULL`) o se borraran en cascada sin previo aviso (`CASCADE`). Con `PROTECT`, si una categoría tiene productos asociados, simplemente no se puede eliminar hasta reasignarlos o borrarlos primero.

Para el precio usé `DecimalField` en vez de `FloatField`, porque con `float` pueden aparecer errores de redondeo al trabajar con dinero. Para el stock, `PositiveIntegerField` ya cubre por sí solo la regla de "entero mayor o igual a cero", sin necesidad de agregar validaciones extra.

En el serializer de producto, la categoría se devuelve anidada (con id y nombre) al leer, pero se recibe como un id simple al crear/editar. Así el listado ya trae el nombre de la categoría sin que el frontend tenga que cruzar datos con otra llamada.

El filtro por categoría y la búsqueda por nombre se resolvieron con `django-filter` y el `SearchFilter` de DRF, en vez de escribir la lógica de filtrado a mano — es el enfoque estándar del framework y evita reinventar algo que DRF ya resuelve bien.

### Supuestos

Asumí que un producto pertenece a una sola categoría, ya que el enunciado la menciona en singular y no se pide lo contrario. Si se necesitara que un producto tuviera varias categorías, el cambio sería pasar de `ForeignKey` a `ManyToManyField`.

### Seguridad

No se implementó ninguna configuración de seguridad (autenticación, permisos, variables de entorno protegidas, etc.), ya que el enunciado indica explícitamente que no se requiere. Los archivos `.env` se dejaron incluidos en el repositorio, sin ocultar ni mover a `.gitignore`, a propósito, para que quien revise el examen pueda levantar el proyecto directamente sin tener que configurar credenciales o variables por su cuenta.

### Interfaz / UX-UI

El foco estuvo en que la interfaz sea funcional y clara, no en el diseño visual — no se trabajó UX/UI de forma dedicada. Se hizo un responsive básico para que se vea razonablemente bien tanto en escritorio como en mobile, pero no se profundizó más allá de eso.

### Limitaciones / mejoras pendientes

- No se implementó paginación en el listado de productos.
- No hay ordenamiento configurable desde la API, solo el orden por defecto del modelo.
- No se capturó explícitamente el error al intentar borrar una categoría con productos asociados (`ProtectedError`); quedaría como mejora devolver un mensaje más claro en vez del error por defecto.
- Solo se cubrieron los dos tests mínimos pedidos (creación válida y rechazo de datos inválidos); no se agregaron tests para categorías ni para filtro/búsqueda.

### Herramientas de IA utilizadas

Se utilizó GitHub Copilot como apoyo puntual durante el desarrollo, principalmente para:

- Autocompletado de código en tareas repetitivas.
- Mejoras menores en el diseño del frontend.
- Sugerencias de validaciones adicionales.
- Desacoplar componentes en piezas más pequeñas para mejorar la legibilidad.

El uso fue acotado y como apoyo dentro del flujo normal de desarrollo, no como generador de la solución completa. Para un proyecto de mayor complejidad, habría considerado un enfoque más agéntico apoyado en alguna metodología como spec-driven development, pero para el alcance de este ejercicio no fue necesario