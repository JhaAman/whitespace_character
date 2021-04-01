from django.db import models
from api.services.constant import *
from api.services.utility import create_unique_id
from rest_framework import serializers


"""
Company Manager
"""
class CompanyManager(models.Manager):
    def create(self, *args, **kwargs):
        # create template
        instance = Company(**kwargs)

        # Auto-generated fields

        # cid
        while True:
            instance.cid = create_unique_id(len=ID_LEN)
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
        max_length=ID_LEN,
        default='0',
        editable=False,
        auto_created=True,
    )

    name = models.CharField(
        max_length=CHARFIELD_SHORT_LEN,
        unique=True,
        blank=False
    )

    values = models.JSONField(
        blank=False,
        null=False
    )

    badges = models.JSONField(
        blank=True,
        null=False,
        default=list
    )

    # date object was created
    date_created = models.DateTimeField(
        auto_now_add=True,
        auto_created=True,
        null=True
    )

    class Meta:
        verbose_name = "Company"


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
