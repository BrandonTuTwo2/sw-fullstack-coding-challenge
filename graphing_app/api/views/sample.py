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
        print("heres the donor Query")
        print(donorQuery)
        #we could use * for default maybe
        if donorQuery is not None:
            print("word")
            queryset = Sample.objects.filter(metadata__donor="Donor 1").values()
        #print("sending back")
        print(queryset[0])
        return queryset