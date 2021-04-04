import json

from rest_framework.test import APITestCase, APIClient
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED


class TestUser(APITestCase):
    def setUp(self):
        self.client = APIClient()