from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from .models import Categoria, Producto


class ProductoAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.categoria = Categoria.objects.create(nombre="Recina")

    def test_crear_producto(self):
        payload = {
            "nombre": "Recina",
            "descripcion": "Recina OdontologicaD",
            "precio": "100000",
            "stock": 10,
            "categoria": self.categoria.id,
        }
        response = self.client.post("/api/productos/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Producto.objects.count(), 1)
        self.assertEqual(Producto.objects.first().nombre, "Recina")

    def test_rechaza_precio_negativo(self):
        payload = {
            "nombre": "Mouse",
            "precio": "-100.00",
            "stock": 5,
            "categoria": self.categoria.id,
        }
        response = self.client.post("/api/productos/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("precio", response.data)
        self.assertEqual(Producto.objects.count(), 0)