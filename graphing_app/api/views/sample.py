from api.models import Sample, ORJSONDecodedField
from api.serializers import SampleSerializer
from rest_framework import viewsets, generics
from django.db import models
from django_filters.rest_framework import DjangoFilterBackend
from api.filters import SampleFilter


class SampleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer

class metaFilter(generics.ListAPIView):
    print("HI IM BEING CALLED")
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = SampleFilter
    '''
    filterset_fields = {
        'dataset_id': ["exact"],
        'donor': ["in","exact"]
    }
    
    def get_queryset(self):
        queryset = Sample.objects.all()
        donorQuery = self.request.query_params.get('donors')
        datasetQuery = self.request.query_params.get('ds')
        print("heres the donor Query")
        print(donorQuery)
        print(datasetQuery)
        #we could use * for default maybe
        if donorQuery is not None:

 
            if "Donor 1" in donorQuery and "Donor 2" not in donorQuery:
                print("word")
                queryset = Sample.objects.filter(dataset_id=datasetQuery,metadata__donor="Donor 1")
            elif "Donor 2" in donorQuery and "Donor 1" not in donorQuery:
                print("bird")
                queryset = Sample.objects.filter(dataset_id=datasetQuery,metadata__donor="Donor 2")
            else:
                print("No change");  
            
        #print("sending back")
        #print(queryset[0])
        return queryset
    '''