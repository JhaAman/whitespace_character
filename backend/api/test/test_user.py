import json

from rest_framework.test import APITestCase, APIClient
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED


class TestUser(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_post_user(self):
        response = self.client.post('/api/create_user/', json.dumps({'first_name': 'Duy', 'last_name': 'Pham'}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, HTTP_201_CREATED)

    def test_get_all_users(self):
        # Create a user
        response = self.client.post('/api/create_user/', json.dumps({'first_name': 'Duy', 'last_name': 'Pham'}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, HTTP_201_CREATED)

        # Get all user
        response = self.client.get('/api/get_users/')
        self.assertEqual(response.status_code, HTTP_200_OK)
        response_body = response.json()
        self.assertTrue('all_users' in response_body)
        self.assertTrue(type(response_body['all_users']) == list)
        self.assertTrue(len(response_body['all_users']) == 1)

        # Check the information for the first users
        first_user = response_body['all_users'][0]
        self.assertTrue(first_user['first_name'], 'Duy')
        self.assertTrue(first_user['last_name'], 'Pham')
