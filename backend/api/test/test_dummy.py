from rest_framework.test import APITestCase, APIClient
from rest_framework.status import HTTP_200_OK


class DummyTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_return_data(self):
        response = self.client.get('/api/dummy_api/', {'n1': 1, 'n2': 1})
        self.assertEqual(response.status_code, HTTP_200_OK)
        response_body = response.json()
        self.assertTrue('sum' in response_body)
        self.assertEqual(response_body['sum'], 2) # 1 + 1 = 2
