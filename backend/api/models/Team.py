from django.db import models

class Team(models.Model):
    tid = models.CharField(max_length=8, default='00000000')
    name = models.CharField(max_length=80)