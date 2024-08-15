import django_filters
from django.db.models import Q
from .models import Sample


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