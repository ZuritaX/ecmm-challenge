from django.shortcuts import render
from django.http import HttpResponse
from .models import Producto
# Create your views here.
def index(request):
    productos = Producto.objects.all()
    context = {
        'productos': productos
    }
    return render(request, 'productos/index.html',context)