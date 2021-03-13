from django.db import models
import api.models.constant as const
from api.helpers.create_unique_id import create_unique_id
import uuid

class Company(models.Model):
    
    # company id (required, unique)
    cid = models.CharField(
        primary_key=True,
        unique=True,
        editable=False,
        max_length=const.ID_LEN,
        default=create_unique_id(len=const.ID_LEN)
    )

    name = models.CharField(
        max_length=const.ID_LEN,
        default='',
        unique=True
    )

    values = models.JSONField(
        default={}
    )

    class Meta:
        verbose_name = "Company"