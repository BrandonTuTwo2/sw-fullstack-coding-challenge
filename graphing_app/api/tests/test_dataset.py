import pytest
from api.models import Dataset
from django.urls import reverse


@pytest.mark.django_db()
def test_get_datasets(drf_superuser_client):
    rv = drf_superuser_client.get(reverse("dataset-list"))
    assert rv.status_code == 200, rv.json()
    assert len(rv.json()) == 0

    Dataset.objects.create(name="Set 1")
    Dataset.objects.create(name="Set 2")

    rv = drf_superuser_client.get(reverse("dataset-list"))
    assert rv.status_code == 200, rv.json()
    assert set([set["name"] for set in rv.json()]) == set(["Set 1", "Set 2"])
