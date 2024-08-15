import django_filters
from django.db.models import JSONField
from .models import Sample

class SampleFilter(django_filters.FilterSet):
    donor = django_filters.CharFilter(field_name='metadata__donor')
    buffer = django_filters.CharFilter(field_name='metadata__buffer')
    incubation = django_filters.CharFilter(field_name='metadata__incubation_time_(hr)')
    #dataset_id = django_filters.IntFilter(field_name='dataset_id')
    class Meta:
        model = Sample
        fields = ['donor','buffer','incubation']