from django.db import models

class Vote(models.Model):
    vid = models.CharField(max_length=8, default='00000000')
    tags = models.CharField(max_length=120)
