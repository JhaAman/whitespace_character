import time
from locust import HttpUser, task, between

user_data = {
    "first_name": "Thomas", 
    "last_name": "Jefferson",
    }

myheaders = {'Content-Type': 'application/json', 'Accept': 'application/json'}

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)
    host = "http://localhost:8000"

    @task
    def create_user_endpoint(self):
        self.client.post(url="/api/create_user/", json=user_data, headers=myheaders)