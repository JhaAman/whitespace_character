from rest_framework.test import APITestCase, APIClient
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED
from django.contrib.auth.models import User


class TestSearchUser(APITestCase):
    def setUp(self):
        self.client = APIClient()
        User.objects.create_superuser('root', '', 'pwd')
        response = self.client.post('/api/get_token/', {'username': 'root', 'password': 'pwd'}, format='json')
        self.assertEqual(response.status_code, HTTP_200_OK)
        token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

    def test_search_user(self):
        response = self.client.post('/api/search/user/', data={'query': 'John'})
        self.assertEqual(response.status_code, HTTP_200_OK)
        assert('data' in response.data)

        l = response.data['data']
        assert(len(l), 0)