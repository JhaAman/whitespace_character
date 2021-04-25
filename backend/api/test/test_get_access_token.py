
from rest_framework.test import APITestCase, APIClient
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED
from django.contrib.auth.models import User

class TestAccessToken(APITestCase):
    def setUp(self):
        self.client = APIClient()
        User.objects.create_user('user', '', 'pwd')

    # def test_get_access_token(self):
    #     response = self.client.post('/api/get_token/', {'username': 'user', 'password': 'pwd'}, format='json')
    #     self.assertEqual(response.status_code, HTTP_200_OK)

    #     assert('role' in response.data)
    #     role = response.data['role'] 
    #     assert(role == 'SuperUser')