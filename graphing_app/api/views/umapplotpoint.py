from api.models import UmapPlotPoint
from api.serializers import UmapplotpointSerializer
from rest_framework import viewsets


class UmapplotpointViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UmapPlotPoint.objects.all()
    serializer_class = UmapplotpointSerializer
