from django.core.validators import MinValueValidator
from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "categorías"
        # Orden alfabético por defecto: hace predecible el listado y más
        # usable en un <select> del frontend.
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
    )
    stock = models.PositiveIntegerField()
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.PROTECT,
        # Nos protege de eliminar una categoría si hay productos asociados a ella
        related_name="productos",
    )
    # auto_now_add=True asigna el timestamp una sola vez, al crear el
    # registro, y lo vuelve no editable. (auto_now=True actualizaría en
    # cada save(), que sería "última modificación", no "creación")
    fechaCreacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Productos más recientes primero; sin esto el orden de retorno
        # no está garantizado por SQL.
        ordering = ["-fechaCreacion"]

    def __str__(self):
        return self.nombre