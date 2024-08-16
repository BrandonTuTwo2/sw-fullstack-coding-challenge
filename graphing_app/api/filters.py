import django_filters
from django.db.models import Q
from .models import Sample


#Used a custom filter instead of the default one since I pass a string array instead 
#meaning I want to see values that contains each val the in values param
#In retrospect I probably could have moved this to samples.py and put this inside get_queryset
class MultiCharFilter(django_filters.CharFilter):
    def filter(self,qs,value):
        if not value:
            return qs
        values = value.split(',')
        queries = Q()

        for val in values:
            queries |= Q(**{f'{self.field_name}__icontains': val})
        
        return qs.filter(queries)
    
class SampleFilter(django_filters.FilterSet):
    donor = MultiCharFilter(field_name='metadata__donor')
    buffer = MultiCharFilter(field_name='metadata__buffer')
    incubation = MultiCharFilter(field_name='metadata__incubation time (hr)')
    dataset_id = django_filters.NumberFilter(field_name='dataset_id')
    class Meta:
        model = Sample
        fields = ['donor','buffer','incubation','dataset_id']