from api.models import Sample
from api.serializers import SampleSerializer
from rest_framework import viewsets, generics
from django.db import models
from django_filters.rest_framework import DjangoFilterBackend
from api.filters import SampleFilter


class SampleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer

class metaFilter(generics.ListAPIView):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = SampleFilter

    def get_serializer_context(self):
        targetRaw = self.request.query_params.get('target',None)
        target = None
        if targetRaw:
            target = targetRaw
        
        return {
            'target': target
        }