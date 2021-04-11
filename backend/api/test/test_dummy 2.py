from rest_framework.test import APITestCase, APIClient
from rest_framework.status import HTTP_401_UNAUTHORIZED


class DummyTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_return_data(self):
        response = self.client.get('/api/dummy_api/', {'n1': 1, 'n2': 1})
        self.assertEqual(response.status_code, HTTP_401_UNAUTHORIZED)
