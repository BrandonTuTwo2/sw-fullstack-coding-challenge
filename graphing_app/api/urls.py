from django.urls import path, include
from rest_framework import routers
from api.views.target import TargetViewSet
from api.views.dataset import DatasetViewSet
from api.views.sample import metaFilter, SampleViewSet 

router = routers.DefaultRouter()
router.register(r"dataset", DatasetViewSet, basename="dataset")
router.register(r"sample",SampleViewSet,basename="sample")
router.register(r"target",TargetViewSet,basename="target")
urlpatterns = [
    path("api/", include(router.urls)),
    path('api/metaFilter/', metaFilter.as_view(), name="metaFilter")
]
