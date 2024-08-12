import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.fixture(scope="session")
def superuser(django_db_blocker, django_db_setup):
    with django_db_blocker.unblock():
        username = "admin"
        password = "admin"
        user = User.objects.create_superuser(username=username, password=password)
        return user


@pytest.fixture()
def drf_superuser_client(client, superuser):
    client = APIClient()
    client.force_authenticate(user=superuser)
    return client
