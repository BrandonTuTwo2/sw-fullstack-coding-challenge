from api.models import Dataset
from api.serializers import DatasetSerializer
from rest_framework import viewsets


class DatasetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer
