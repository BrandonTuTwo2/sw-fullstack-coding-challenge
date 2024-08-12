from django.urls import path, include
from rest_framework import routers
from api.views.dataset import DatasetViewSet

router = routers.DefaultRouter()
router.register(r"dataset", DatasetViewSet, basename="dataset")

urlpatterns = [path("api/", include(router.urls))]
