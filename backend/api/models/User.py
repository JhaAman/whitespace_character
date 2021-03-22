from django.db import models
import uuid

class User(models.Model):
    uid = models.CharField(primary_key= True,unique= True, max_length = 100, default = uuid.uuid4,auto_created = True)
    tid = models.CharField(max_length=8, default='00000000')
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length = 70, default='BlankSpace@gmail.com')
    password = models.CharField(max_length=40, default= '000000000')
    values_score = models.JSONField(default = {})