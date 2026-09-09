from rest_framework import routers
from .api import CategoriaViewSet, ProductoViewSet
router = routers.DefaultRouter()

router.register(r'api/productos', ProductoViewSet, basename='producto')
router.register(r"api/categorias", CategoriaViewSet, basename="categoria")

urlpatterns = router.urls