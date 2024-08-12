from rest_framework import serializers
from api.models import Dataset, Target, Sample, UmapPlotPoint


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ["id", "name"]

class TargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = ["id","name"]

class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = ["id","metadata","dataset_id","plate_barcode","well_id"]

class UmapplotpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = UmapPlotPoint
        fields = ["id","x_coor","y_coor","sample_id"]



