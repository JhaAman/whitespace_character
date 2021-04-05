from django.db import models
from api.models.User import *
from api.models.Team import *
from api.models.Company import *
from api.services.constant import *
from api.services.utility import create_unique_id
from rest_framework import serializers


class RecognitionManager(models.Manager):
    def create(self, *args, **kwargs):

        # create template
        instance = Recognition(**kwargs)

        # referencing User by Recognition.uid_{from/to}
        # add reference to User objects
        instance.user_from = User.objects.get(uid=instance.uid_from)
        instance.user_to = User.objects.get(uid=instance.uid_to)

        # Auto-generated fields

        # rid
        while True:
            instance.rid = create_unique_id(len=ID_LEN)
            if not Recognition.objects.filter(rid=instance.rid).exists():
                break

        # update user_to score
        for key in kwargs['tags']:
            instance.user_to.values_scores[key] += 1
        instance.user_to.save()

        # validate fields
        instance.full_clean()

        # create object in database
        instance.save()

        return instance


class Recognition(models.Model):

    objects = RecognitionManager()

    rid = models.CharField(
        primary_key=True,
        unique=True,
        max_length=ID_LEN,
        default='0',
        auto_created=True,
    )

    user_from = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        null=True,
        auto_created=True,
        related_name="userid_from"
    )

    user_to = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        null=True,
        auto_created=True,
        related_name="userid_to"
    )

    uid_from = models.CharField(
        max_length=ID_LEN,
        blank=False,
    )

    uid_to = models.CharField(
        max_length=ID_LEN,
        blank=False,
    )

    tags = models.JSONField(
        default=dict,
        blank=True,
    )

    flag_count = models.IntegerField(
        default=0
    )

    comments = models.CharField(
        max_length=CHARFIELD_LONG_LEN,
        default='',
        blank=True
    )

    flag_count = models.IntegerField(
        default=0,
    )

    # date object was created
    date_created = models.DateTimeField(
        auto_now_add=True,
        auto_created=True,
    )

    class Meta:
        verbose_name = "Recognition"


class RecognitionSerializer(serializers.ModelSerializer):
    def validate_uid_from(self, value):
        if not User.objects.filter(uid=value).exists():
            raise serializers.ValidationError("uid_from not found")
        return value

    def validate_uid_to(self, value):
        if not User.objects.filter(uid=value).exists():
            raise serializers.ValidationError("uid_to not found")
        return value

    def validate(self, data):
        # Check uid_from is different from uid_to
        if data['uid_from'] == data['uid_to']:
            raise serializers.ValidationError("uid_from and uid_to must be different")

        # Check valid tags
        userRef = User.objects.get(uid=data['uid_from'])
        teamRef = Team.objects.get(tid=userRef.tid)
        companyRef = Company.objects.get(cid=teamRef.cid)
        tagsActual = companyRef.values
        for key in data['tags']:
            if key not in tagsActual:
                raise serializers.ValidationError("{key} tag is not specified by organization".format(key=key))

        return data

    class Meta:
        model = Recognition
        fields = ['uid_from', 'uid_to', 'tags', 'comments']


