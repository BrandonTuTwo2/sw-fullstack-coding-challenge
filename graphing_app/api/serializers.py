from rest_framework import serializers
from api.models import Dataset, Target, Sample, UmapPlotPoint, SampleSignal


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ["id", "name"]

class TargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = ["id","name"]

class UmapplotpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = UmapPlotPoint
        fields = ["id","x_coor","y_coor","sample_id"]

class SampleSignalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SampleSignal
        fields = ["id","signal","sample_id","target_id"]

class SampleSerializer(serializers.ModelSerializer):
    umapPlotPoint = UmapplotpointSerializer(many=True,read_only=True)
    sampleSignals = SampleSignalSerializer(many=True,read_only=True)
    class Meta:
        model = Sample
        fields = ["id","metadata","dataset_id","plate_barcode","well_id","umapPlotPoint","sampleSignals"]



