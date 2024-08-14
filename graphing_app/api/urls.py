from django.urls import path, include
from rest_framework import routers

from api.views.dataset import DatasetViewSet
from api.views.target import TargetViewSet
from api.views.sample import metaFilter, SampleViewSet 
from api.views.umapplotpoint import UmapplotpointViewSet

router = routers.DefaultRouter()
router.register(r"dataset", DatasetViewSet, basename="dataset")
router.register(r"target",TargetViewSet,basename="target")
router.register(r"sample",SampleViewSet,basename="sample")
router.register(r"umapplotpoint",UmapplotpointViewSet,basename="umapplotpoint")
urlpatterns = [
    path("api/", include(router.urls)),
    path('api/metaFilter/', metaFilter.as_view(), name="metaFilter")
]
