from rest_framework import viewsets, permissions, filters
from .models import Producto, Categoria
from .serializer import ProductoSerializer, CategoriaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    permission_classes = [permissions.AllowAny]  # Permitir acceso a cualquier usuario
    serializer_class = ProductoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["nombre"] # Busqueda de productos por nombre

    def get_queryset(self):  # Filtrar productos por Categoria
        productos = Producto.objects.all()
        categoria = self.request.GET.get("categoria")

        if categoria:
            productos = productos.filter(categoria_id=categoria)

        return productos
    
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    permission_classes = [permissions.AllowAny]   # Permitir acceso a cualquier usuario
    serializer_class = CategoriaSerializer
    