import time
from locust import HttpUser, task, between

dummy_data = {
    "n1": 1, 
    "n2": 2
}

myheaders = {'Content-Type': 'application/json', 'Accept': 'application/json'}

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_users_endpoint(self):
        self.client.get(url="/api/get_users")

    @task
    def get_votes_endpoint(self):
        self.client.get(url="/api/get_votes")
    
    @task
    def get_dummy_endpoint(self):
        self.client.get(url="/api/dummy_api/", json=dummy_data, headers=myheaders)

