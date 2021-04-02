from django.db import models
from api.models.User import *
from api.services.constant import *
from api.services.utility import create_unique_id
from rest_framework import serializers

class NotificationManager(models.Manager):
    def create(self, *args, **kwargs):

        # create template
        instance = Notification(**kwargs)

        # add reference to User objects
        instance.notif_user = User.objects.get(uid=instance.notif_uid)

        # Auto-generated fields

        # nid
        while True:
            instance.nid = create_unique_id(len=ID_LEN)
            if not Notification.objects.filter(nid=instance.nid).exists():
                break

        # validate fields
        instance.full_clean()

        # create object in database
        instance.save()

        return instance

class Notification(models.Model):

    objects = NotificationManager()

    nid = models.CharField(
        primary_key=True,
        unique=True,
        max_length=ID_LEN,
        default='0',
        auto_created=True,
    )

    notif_user = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        null=True,
        auto_created=True,
    )

    notif_uid = models.CharField(
        max_length=ID_LEN,
        blank=False,
    )

    notif_message = models.CharField(
        max_length=CHARFIELD_LONG_LEN,
        default='',
        blank=True
    )

    date_created = models.DateTimeField(
        auto_now_add=True,
        auto_created=True,
    )

    class Meta:
        verbose_name = "Notification"

class NotificationSerializer(serializers.ModelSerializer):
    def validate_notif_uid(self, value):
        if not User.objects.filter(uid=value).exists():
            raise serializers.ValidationError("uid_notif not found")
        return value
    
    class Meta:
        model = Notification
        fields = ['notif_uid', 'notif_message']