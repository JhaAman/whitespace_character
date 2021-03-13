from django.db import models
import api.models.constant as const
from api.helpers.create_unique_id import create_unique_id

class Vote(models.Model):
    vid = models.CharField(
        primary_key=True,
        unique=True,
        editable=False,
        max_length=const.ID_LEN, 
        default=create_unique_id(len=const.ID_LEN),
        auto_created=True
    )

    uid_from = models.CharField(
        max_length=const.ID_LEN,
        default='0',
        blank=False
    )

    uid_to = models.CharField(
        max_length=const.ID_LEN,
        default='0',
        blank=False
    )

    tags = models.JSONField(null=True)

    comments = models.CharField(
        max_length=const.CHARFIELD_LONG_LEN,
        default='',
        blank=True
    )

    class Meta:
        verbose_name = "Vote"