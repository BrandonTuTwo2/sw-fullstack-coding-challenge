from api.models import Sample, ORJSONDecodedField
from api.serializers import SampleSerializer
from rest_framework import viewsets, generics
from django.db import models


class SampleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer

class metaFilter(generics.ListAPIView):
    serializer_class = SampleSerializer

    def get_queryset(self):
        queryset = Sample.objects.all()
        donorQuery = self.request.query_params.get('donors')
        #we could use * for default maybe
        if donorQuery is not None:
            queryset = Sample.objects.filter(metadata__donor=donorQuery).values()
        else:
            print("NO BEUNO")
        return queryset