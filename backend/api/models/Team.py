from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from api.services.constant import *
from api.models.Company import Company
from api.services.utility import create_unique_id
from rest_framework import serializers


"""
Team Manager
"""
class TeamManager(models.Manager):
    def create(self, *args, **kwargs):

        # create template
        instance = Team(**kwargs)

        # first, check if Company object with id=Team.cid exists
        # if doesn't, raise ObjectDoesNotExist()
        if not Company.objects.filter(cid=instance.cid).exists():
            raise ObjectDoesNotExist()
        # if does, add reference to Company object
        companyRef = Company.objects.get(cid=instance.cid)
        instance.company = companyRef

        # Auto-generated fields

        # tid
        while True:
            instance.tid = create_unique_id(len=ID_LEN)
            if not Team.objects.filter(tid=instance.tid).exists():
                break

        # values_scores
        valuesList = companyRef.values
        instance.values_scores = dict().fromkeys(valuesList, 0)
        
        # badges
        badgesList = list()

        # validate fields
        instance.full_clean()

        # create object in database
        instance.save()

        return instance


"""
Team object model

Required field
    company
    name

Optional field
    tid
    values_scores
"""


class Team(models.Model):
    objects = TeamManager()

    # refer to Company object model as primary key
    company = models.ForeignKey(
        Company,
        on_delete=models.SET_NULL,
        null=True,
        auto_created=True
    )

    cid = models.CharField(
        blank=False,
        max_length=ID_LEN,
    )

    # team id (required, unique, autogenerated)
    tid = models.CharField(
        primary_key=True,
        unique=True,
        default='0',
        max_length=ID_LEN,
        auto_created=True,
    )

    # team name (required, unique)
    name = models.CharField(
        max_length=CHARFIELD_SHORT_LEN,
        unique=True,
        blank=False,
    )

    # scores on company corporate values
    values_scores = models.JSONField(
        default=list,
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
        verbose_name = "Team"


class TeamSerializer(serializers.ModelSerializer):

    def validate_cid(self, value):
        if not Company.objects.filter(cid=value).exists():
            raise serializers.ValidationError("Company id not found")
        return value
    class Meta:
        model = Team
        fields = '__all__'