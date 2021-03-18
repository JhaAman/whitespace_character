from django.db import models
from api.models.User import User
import api.services.constant as const
import api.services.utility as utils
from rest_framework import serializers


"""
Recognition Manager
"""
class RecognitionManager(models.Manager):
    def create(self, *args, **kwargs):

        # create template
        instance = Recognition(**kwargs)

        # referencing User by Recognition.uid_{from/to}

        # first, check if User objects with id=Recognition.uid_{from/to} exists
        # if doesn't, raise ObjectDoesNotExist()
        cond = models.Q(uid=instance.uid_from) | models.Q(uid=instance.uid_to)
        if not User.objects.filter(cond).exists():
            raise ObjectDoesNotExist()
        # if does, add reference to User objects
        instance.user_from = User.objects.get(uid=instance.uid_from)
        instance.user_to = User.objects.get(uid=instance.uid_to)

        # Auto-generated fields

        # rid
        while True:
            instance.rid = utils.create_unique_id(len=const.ID_LEN)
            if not Recognition.objects.filter(rid=instance.rid).exists():
                break

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
        max_length=const.ID_LEN,
        default='0',
        auto_created=True,
    )

    user_from = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        null=True,
        auto_created=True,
    )

    user_to = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        null=True,
        auto_created=True,
    )

    uid_from = models.CharField(
        max_length=const.ID_LEN,
        default='0',
    )

    uid_to = models.CharField(
        max_length=const.ID_LEN,
        default='0',
    )

    tags = models.JSONField(
        default=dict,
        blank=True,
    )

    comments = models.CharField(
        max_length=const.CHARFIELD_LONG_LEN,
        default='',
        blank=True
    )

    # date object was created
    created_date = models.DateTimeField(
        auto_now_add=True,
        auto_created=True,
    )

    class Meta:
        verbose_name = "Vote"


class RecognitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recognition
        fields = '__all__'
