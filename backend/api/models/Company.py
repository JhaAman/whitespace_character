from django.db import models
import api.services.constant as const
import api.services.utility as utils
from rest_framework import serializers


"""
Company Manager
"""
class CompanyManager(models.Manager):
    def create(self, *args, **kwargs):
        # create template
        instance = Company(**kwargs)
        
        # Auto-generated fields
        
        ## cid
        while True:
            instance.cid = utils.create_unique_id(len=const.ID_LEN)
            if not Company.objects.filter(cid=instance.cid).exists():
                break

        # validate fields
        instance.full_clean()

        # create object in database
        instance.save()
        # return template
        return instance


class Company(models.Model):

    # Self-defined Manager
    objects = CompanyManager()

    # company id (required, unique, self-generated)
    cid = models.CharField(
        primary_key=True,
        unique=True,
        max_length=const.ID_LEN,
        default='0',
        editable=False,
        auto_created=True,
    )

    name = models.CharField(
        max_length=const.CHARFIELD_SHORT_LEN,
        default='',
        unique=True,
    )

    values = models.JSONField(
        default=list,
    )

    # date object was created
    created_date = models.DateTimeField(
        auto_now_add=True,
        auto_created=True,
        null=True
    )

    class Meta:
        verbose_name = "Company"
