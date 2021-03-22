from django.db import models
import uuid
class Vote(models.Model):
    vid = models.CharField(primary_key = True, unique = True, auto_created = True, default = uuid.uuid4, max_length = 100)
    tags = models.CharField(max_length=120)
    uid_from = models.CharField(max_length = 100,default = '0')
    uid_to = models.CharField(max_length = 100,default = '0')
