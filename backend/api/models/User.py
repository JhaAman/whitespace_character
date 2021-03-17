from django.db import models
import api.services.constant as const
from api.models.Company import Company
from api.models.Team import Team
import api.services.utility as utils
import uuid


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
        
        ## uid
        while True:
            instance.uid = utils.create_unique_id(len=const.ID_LEN)
            if not User.objects.filter(uid=instance.uid).exists():
                break

        ## values_scores
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
        max_length=const.ID_LEN,
        default='0'
    )

    # user id (required, autogenerated)
    uid = models.CharField(
        primary_key=True,
        unique=True,
        max_length=const.ID_LEN,
        default='0',
        auto_created=True,
    )

    # first name (required)
    first_name = models.CharField(
        max_length=const.CHARFIELD_SHORT_LEN,
    )

    # last name (required)
    last_name = models.CharField(
        max_length=const.CHARFIELD_SHORT_LEN,
        blank=False
    )

    # email (required)
    email = models.EmailField(
        max_length=const.CHARFIELD_SHORT_LEN,
    )

    # password (required)
    password = models.CharField(
        max_length=const.CHARFIELD_LONG_LEN,
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

    # date object was created
    created_date = models.DateTimeField(
        auto_now_add=True,
        auto_created=True,
        null=True
    )

    # scores on corporate values
    values_scores = models.JSONField(
        default=list,
    )

    class Meta:
        verbose_name = "User"
