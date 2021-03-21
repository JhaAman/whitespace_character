import time
from locust import HttpUser, task, between

dummy_data = {
    "n1": 1, 
    "n2": 2
}

myheaders = {'Content-Type': 'application/json', 'Accept': 'application/json'}

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)
    host = "http://localhost:8000"

    @task
    def get_dummy_endpoint(self):
        self.client.get(url="/api/dummy_api/", json=dummy_data, headers=myheaders)