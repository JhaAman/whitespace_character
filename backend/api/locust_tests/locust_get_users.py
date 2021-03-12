import time
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)
    host = "http://localhost:8000"

    @task
    def get_users_endpoint(self):
        self.client.get(url="/api/get_users")