from django.db import models
from api.services.constant import *
from api.models.Company import Company
from api.models.Team import Team
from api.services.utility import create_unique_id
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist




"""
User Manager
"""
class UserManager(models.Manager):
    def create(self, *args, **kwargs):

        # create template
        instance = User(**kwargs)

        # first, check if Team object with id=Team.tid exists
        # if doesn't, raise ObjectDoesNotExist()
        if not Team.objects.filter(tid=instance.tid).exists():
            raise ObjectDoesNotExist()
        # if does, add reference to Team object
        teamRef = Team.objects.get(tid=instance.tid)
        instance.team = teamRef

        # Auto-generated fields

        # uid
        while True:
            instance.uid = create_unique_id(len=ID_LEN)
            if not User.objects.filter(uid=instance.uid).exists():
                break

        # values_scores
        companyRef = Company.objects.filter(cid=teamRef.cid).get()
        valuesList = companyRef.values
        instance.values_scores = dict().fromkeys(valuesList, 0)

        # validate fields
        instance.full_clean()

        # create object in database
        instance.save()

        return instance


"""
User model object

Required fields:
    first_name
    last_name
    email
    password

Optional fields:
    position
    user_role
    values_scores
"""
class User(models.Model):

    objects = UserManager()

    # team (required)
    team = models.ForeignKey(
        to=Team,
        on_delete=models.SET_NULL,
        null=True,
        auto_created=True,
    )

    tid = models.CharField(
        max_length=ID_LEN,
        blank=False
    )

    # user id (required, autogenerated)
    uid = models.CharField(
        primary_key=True,
        unique=True,
        max_length=ID_LEN,
        default='0',
        auto_created=True,
    )

    # first name (required)
    first_name = models.CharField(
        max_length=CHARFIELD_SHORT_LEN,
        blank=False
    )

    # last name (required)
    last_name = models.CharField(
        max_length=CHARFIELD_SHORT_LEN,
        blank=False
    )

    # email (required)
    email = models.EmailField(
        max_length=CHARFIELD_SHORT_LEN,
        unique=True,
        blank=False
    )

    # password (required)
    password = models.CharField(
        max_length=CHARFIELD_LONG_LEN,
        blank=False
    )

    # user role ('manager', 'employee', 'dev')
    # default = 'employee'
    user_role = models.CharField(
        max_length=3,
        choices=[
            ("emp", "employee"),
            ("mng", "manager"),
            ("dev", "developer")
        ],
        default='emp'
    )

    title = models.CharField(
        max_length=CHARFIELD_SHORT_LEN,
        blank=True,
        default=''
    )
    
    badges = models.JSONField(
        blank=True,
        null=False,
        default=list
    )

    network = models.JSONField(
        blank=True,
        null=False,
        default=list
    )

    profile_picture = models.ImageField(
        null=True,
        blank=True,
        upload_to="images/",
    )

    # date object was created
    date_created = models.DateTimeField(
        auto_now_add=True,
        auto_created=True,
        null=True
    )

    # scores on corporate values
    values_scores = models.JSONField(
        default=dict,
        blank=True
    )

    class Meta:
        verbose_name = "User"


class UserSerializer(serializers.ModelSerializer):
    def validate_tid(self, value):
        if not Team.objects.filter(tid=value).exists():
            raise serializers.ValidationError("Team id not found")
        return value
    
    class Meta:
        model = User
        fields = ['tid', 'uid', 'first_name', 'last_name', 'email', 'title'
            , 'badges', 'network', 'values_scores', 'profile_picture']