import time
from locust import HttpUser, task, between

vote_data = {
    "vid": "12345678", 
    "tags": "most_innovative",
    }

myheaders = {'Content-Type': 'application/json', 'Accept': 'application/json'}

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)
    host = "http://localhost:8000"

    @task
    def create_vote_endpoint(self):
        self.client.post(url="/api/create_vote/", json=vote_data, headers=myheaders)