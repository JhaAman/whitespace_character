from django.db import models

class User(models.Model):
    uid = models.CharField(max_length=8, default='00000000')
    tid = models.CharField(max_length=8, default='00000000')
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)