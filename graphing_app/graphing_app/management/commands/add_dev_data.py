from django.core.management.base import BaseCommand
from api.models import Dataset, Target, UmapPlotPoint, SampleSignal, Sample
import math
import random


def well_index_to_row_col(wellIndex):
    row = math.ceil(wellIndex / 12)
    col = wellIndex - 12 * (row - 1)
    return [row, col]


def row_col_to_well_name(row, col):
    wellName = chr(row + 64) + str(col).zfill(2)
    return wellName


def well_index_to_well_name(wellIndex):
    row, col = well_index_to_row_col(wellIndex)
    wellName = row_col_to_well_name(row, col)
    return wellName


class Command(BaseCommand):
    def handle(self, *args, **options):
        UmapPlotPoint.objects.all().delete()
        SampleSignal.objects.all().delete()
        Sample.objects.all().delete()
        Target.objects.all().delete()
        Dataset.objects.all().delete()

        Dataset.objects.get_or_create(name="Set 1")
        Dataset.objects.get_or_create(name="Set 2")

        target_names = [
            "APRIL",
            "BAFF",
            "CCL1",
            "CNTF",
            "IFN gamma",
            "Mesothelin",
            "PDGF-BB",
            "TWEAK",
            "uPA",
            "PD-1",
        ]
        Target.objects.bulk_create([Target(name=name) for name in target_names])

        metadata_options = {
            "donor": ["Donor 1", "Donor 2", "Donor 2"],
            "buffer": ["PBS", "NaCl"],
            "incubation time (hr)": [1, 2, 3, 4],
        }

        samples = []
        for dataset in Dataset.objects.all():
            for well_index in range(1, 97):
                metadata = {}
                for key, values in metadata_options.items():
                    value_index = random.randint(0, len(values) - 1)
                    metadata[key] = values[value_index]

                samples.append(
                    Sample(
                        metadata=metadata,
                        well_id=well_index_to_well_name(well_index),
                        plate_barcode="plate_1",
                        dataset=dataset,
                    )
                )

        Sample.objects.bulk_create(samples)

        sample_signals = []
        umap_points = []
        targets = Target.objects.all()
        for sample in Sample.objects.all():
            for target in targets:
                sample_signals.append(
                    SampleSignal(
                        sample=sample,
                        target=target,
                        signal=round(random.uniform(-10, 10), 2),
                    )
                )
            umap_points.append(
                UmapPlotPoint(
                    sample=sample,
                    x_coor=round(random.uniform(-10, 10), 2),
                    y_coor=round(random.uniform(-10, 10), 2),
                )
            )

        SampleSignal.objects.bulk_create(sample_signals)
        UmapPlotPoint.objects.bulk_create(umap_points)
