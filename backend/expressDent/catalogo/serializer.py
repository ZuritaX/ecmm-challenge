from rest_framework import serializers
from .models import Categoria, Producto

class ProductoSerializer(serializers.ModelSerializer): # Serializador para la modelo Producto
    class Meta:
        model = Producto
        fields = '__all__'  
        read_only_fields = ['id','fechaCreacion']  # Campo de solo lectura

class CategoriaSerializer(serializers.ModelSerializer): # Serializador para la modelo Categoria
    class Meta:
        model = Categoria
        fields = "__all__"