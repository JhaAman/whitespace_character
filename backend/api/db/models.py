""" Model Object Classes

Org: Team Whitespace Character
Authors: Khai Nguyen, khainguyen@umass.edu
Created: April 4th, 2021

There are 5 main model objects:
        Company, Team, User, Recognition

Detailed data schema can be found at:
        https://dbdiagram.io/d/60516c4becb54e10c33bc840
"""

import pytz

from django.db import models
from django.db.models import F, Q
from django.utils import timezone, dateformat
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.postgres import fields
from django.contrib.auth.models import User as AuthUser
from django.contrib.auth.hashers import make_password

from rest_framework import serializers

from api.db.constant import *
from api.db.utils import create_unique_id

"""
Model field legends:

    || 'P'       : Primary key.
    || 'FK'      : Foreign key.
    || '*'       : Required, must be non-null and non-blank.
    || 'unique'  : Must be unique.
    || 'null'    : Can be null (e.g None, Nothing, ...)
    || 'blank'   : Can be blank (e.g [], {}, (), '', ...). Not to be
    ||                 confused with 'null'.
    || 'default' : Default value for field if not explicitly specified
    ||                         by request.
    || 'auto'    : Auto-generated. Can be overriden as desired.
    || 'choices' : List of possible values for the field.
"""


class CompanyManager(models.Manager):
    """Company Manager

    Manager class for Company model object.
    """
    
    def create(self, *args, **kwargs):
        """Company.objects.create

        - Create Company model object and save to database.
        - Overriding from default method.
        - Generate initial 'date_created' to current UTC time.
        - Returns created Company object on success.
        """

        # Generate unique 'cid'
        while True:
            # Generate a random 8-digit 'cid' until it is unique
            # Pr(collision) = 1/10^8, good enough for MVP
            kwargs['cid'] = create_unique_id(len=ID_LEN)
            if not Company.objects.filter(cid=kwargs['cid']).exists():
                break

        # Create object in database
        companyObj = super(CompanyManager, self).create(*args, **kwargs)

        return companyObj


class Company(models.Model):
    """Company Model Object

    Fields in Company model are given below, legend table is given at line 26

    'cid' (P, *, unique, auto, default = '0'):
        - Unique 8-digit identifier for each Company object.
        - Primary key
    'name' (*, unique):
        - Formal organization name
        - 120-char string
    'values' (blank, default = []):
        - Explicit Company culture values
        - Serves as categories for employee recognition system
        - List of 60-char strings
    'badges' (blank, default = []):
        - Explicit Company badge names
        - Badges serves as reward system
        - Employees earn badges with their values scores
        - List of 60-char strings
    'date_created': (auto, default = datetime.now() UTC time)
        - Date object was created
        - Datetime
        - Date format reference at
            https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#date
    """

    # Self-defined Manager
    objects = CompanyManager()

    # Company ID (*, unique, auto)
    cid = models.CharField(
        primary_key=True,
        unique=True,
        max_length=ID_LEN,
        default='0',
        editable=False,
        auto_created=True,
    )

    # Formal organization name (*, unique)
    name = models.CharField(
        max_length=CHARFIELD_LONG_LEN,
        unique=True,
        blank=False)

    # Cultural values (blank, default = [])
    values = \
        fields.ArrayField(
            base_field=models.CharField(max_length=CHARFIELD_SHORT_LEN), 
            default=list, 
            blank=True, 
            null=False)

    # Badges names (blank, default = [])
    badges = \
        fields.ArrayField(
            base_field=models.CharField(max_length=CHARFIELD_SHORT_LEN), 
            default=list, 
            blank=True, 
            null=False)

    # Date object was created (auto, default = datetime.now() UTC time)
    date_created = models.DateTimeField(
        default=dateformat.format(timezone.now(), 'Y-m-d H:i:s'),
        auto_created=True,
        null=True)

    class Meta:
        verbose_name = "Company"


class TeamManager(models.Manager):
    """Team Manager

    Manager class for Team model object.
    """

    def create(self, *args, **kwargs):
        """Team.objects.create

        - Create Team model object and save to database.
        - Overriding from default method.
        - Returns created Team object on success.
        - Reference primary key at parent Company model object.
        - Generate initial 'values_scores' where keys are specified by
                parent Company mode, and values are set to 0.
        - Generate initial empty list 'badges'.
        - Generate initial 'date_created' to current UTC time.
        """

        # Add primary key reference to parent Company:
        companyObj = Company.objects.get(cid=kwargs['cid'])
        kwargs['company'] = companyObj

        # Generate random 'tid':
        while True:
            # Generate a random 8-digit 'cid' until it is unique
            # Pr(collision) = 1/10^8, good enough for MVP
            kwargs['tid'] = create_unique_id(len=ID_LEN)
            if not Team.objects.filter(tid=kwargs['tid']).exists():
                break

        # Generate initial 'values_scores'
        valueList = companyObj.values
        kwargs['values_scores'] = dict().fromkeys(valueList, 0)

        # Generate initial 'badges'
        kwargs['badges'] = list()

        # Create object in database
        teamObj = super(TeamManager, self).create(*args, **kwargs)

        return teamObj


class Team(models.Model):
    """Team Model Object

    Fields in Company model are given below, legend table is given at line 26

    'cid' (*, FK):
        - Reference to parent Company object
        - Foreign key
    'tid' (P, *, unique, auto, default = '0'):
        - Unique 8-digit identifier for each Team object.
        - Primary key
    'name' (*, unique):
        - Formal Team name
        - 120-char string
    'values_scores' (blank, default = {}):
        - Score sheet on values
        - Values are specified by parent Company object
        - Dictionary
    'badges' (blank, default = []):
        - Badge names earned by Team
        - Badge names are specified by parent Company object
        - List of 60-char strings
    'date_created': (auto, default = datetime.now() UTC time)
        - Date object was created
        - Datetime
        - Date format reference at
            https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#date
    """

    # Self-defined Manager
    objects = TeamManager()

    # Object reference to parent Company object (auto)
    # Implement-as-specified by Django, not used in APIs
    company = models.ForeignKey(
        to=Company,
        on_delete=models.CASCADE,
        null=True,
        auto_created=True)

    # Reference to parent Company object (*, FK)
    cid = models.CharField(
        blank=False,
        max_length=ID_LEN,
    )

    # Team ID (P, *, unique, auto, default = '0')
    tid = models.CharField(
        primary_key=True,
        unique=True,
        default='0',
        max_length=ID_LEN,
        auto_created=True)

    # Formal Team name (*, unique)
    name = models.CharField(
        max_length=CHARFIELD_SHORT_LEN,
        unique=True,
        blank=False)

    # Scores on Company corporate values (blank, default = {})
    values_scores = models.JSONField(default=dict, blank=True)

    # Badges names earned by Team (blank, default = [])
    badges = \
        fields.ArrayField(
            base_field=models.CharField(max_length=CHARFIELD_SHORT_LEN), 
            default=list, 
            blank=True, 
            null=False)

    # Date object was created (auto, default = datetime.now() UTC time)
    date_created = models.DateTimeField(
        default=dateformat.format(timezone.now(), 'Y-m-d H:i:s'),
        auto_created=True,
        null=True)

    class Meta:
        verbose_name = "Team"


class UserManager(models.Manager):
    """User Manager

    Manager class for User model object.
    """

    def create(self, *args, **kwargs):
        """User.objects.create

        - Create User model object and save to database.
        - Returns created User object on success.
        - Reference primary key at parent Team model object.
        - Generate initial 'values_scores' where keys are specified by
                parent Company mode, and values are set to 0.
        - Generate initial empty list 'badges'.
        - Generate initial 'date_created' to current UTC time.
        """

        # Add primary key reference to Team object
        teamObj = Team.objects.get(tid=kwargs['tid'])
        kwargs['team'] = teamObj

        # Generate unique 'uid'
        while True:
            # Generate a random 8-digit 'cid' until it is unique
            # Pr(collision) = 1/10^8, good enough for MVP
            kwargs['uid'] = create_unique_id(len=ID_LEN)
            if not User.objects.filter(uid=kwargs['uid']).exists():
                break

        # Generate initial 'values_scores'
        companyObj = Company.objects.get(cid=teamObj.cid)
        valueList = companyObj.values
        kwargs['values_scores'] = dict().fromkeys(valueList, 0)

        # Generate initial list 'badges'
        kwargs['badges'] = list()

        # Generate initial list 'network'
        kwargs['network'] = list()

        if 'user_role' not in kwargs:
            kwargs['user_role'] = "emp"

        # Creating fields for Auth object
        authObjFields = {
            'id':
                kwargs['uid'],
            'username':
                kwargs['email'],
            'last_login':
                dateformat.format(timezone.now(), 'Y-m-d H:i:s'),
            'is_staff':
                kwargs['user_role'] == "mng"
                or kwargs['user_role'] == "manager",
            'password':
                make_password(kwargs['password']),
            'email':
                kwargs['email'],
        }
        # Regiser Authenticated User
        AuthUser.objects.create(**authObjFields)

        # Create object in database
        userObj = super(UserManager, self).create(*args, **kwargs)

        return userObj

    def all(self, *args, **kwargs):
        """User.objects.all

        - Update User network each time User gets pulled from database.
        """

        userQsList = super().all()
        for userObj in userQsList:
            networkQsList = self.filter(tid=userObj.tid)
            userObj.network = [peerObj.uid for peerObj in networkQsList]
        return userQsList

    def get(self, *args, **kwargs):
        """User.objects.get

        - Update User network each time User gets pulled from database.
        """

        userObj = super().get(uid=kwargs['uid'])
        networkQsList = self.filter(tid=userObj.tid)
        userObj.network = [peerObj.uid for peerObj in networkQsList]
        return userObj


class User(models.Model):
    """User Model Object

    Fields in Company model are given below, legend table is given at line 26

    'tid' (*, FK):
        - Reference to parent Team object
        - Foreign key
    'uid' (P, *, unique, auto, default = '0'):
        - Unique 8-digit identifier for each User object.
        - Primary key
    'first_name' (*):
        - User's legal first name
        - 60-char string
    'last_name' (*):
        - User's legal last name
        - 60-char string
    'email' (*, unique):
        - User's account email
        - 60-char string
    'password' (*):
        - User's account password
        - 120-char string
    'user_role' (choices =["emp", "mng", "adm"], default = "emp"):
        - User endpoint access privilege.
        - 3 roles to choose from:
                "emp" employee, "mng" manager, "admin" admin
        - Default sets to "emp".
    'title' (blank, default = ''):
        - User's formal work title
        - 60-char string
    'profile_picture' (null, blank):
        - User's account profile picture
        - CDN path is directly on backend server
    'values_scores' (blank, default = {}):
        - Score sheet on values
        - Values are specified by parent Company object
        - Dictionary
    'badges' (blank, default = []):
        - Badge names earned by User
        - Badge names are specified by parent Company object
        - List of 60-char strings
    'network' (blank, default = []):
        - List of references to other Users in the same Team
        - List of 'uid'
    'date_created': (auto, default = datetime.now() UTC time)
        - Date object was created
        - Datetime
        - Date format reference at
            https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#date
    """

    # Self-defined Manager
    objects = UserManager()

    # Object reference to parent Company object (auto)
    # Implement-as-specified by Django, not used in APIs
    team = models.ForeignKey(
        to=Team,
        on_delete=models.CASCADE,
        null=True,
        auto_created=True,
    )

    # Reference to parent Team object (*, FK)
    tid = models.CharField(max_length=ID_LEN)

    # User ID (P, *, unique, auto, default = '0')
    uid = models.CharField(
        primary_key=True,
        unique=True,
        max_length=ID_LEN,
        default='0',
        auto_created=True,
    )

    # Legal first name (*)
    first_name = models.CharField(max_length=CHARFIELD_SHORT_LEN, )

    # Legal last name (*)
    last_name = models.CharField(max_length=CHARFIELD_SHORT_LEN, )

    # Account email (*)
    email = models.EmailField(
        max_length=CHARFIELD_SHORT_LEN,
        unique=True,
    )

    # Account password (*)
    password = models.CharField(max_length=CHARFIELD_LONG_LEN, )

    # User role (choices =["emp", "mng", "adm"], default = "emp")
    user_role = models.CharField(
        max_length=3,
        choices=[("emp", "employee"),
                ("mng", "manager"),
                ("adm", "administrator")],
        default="emp")

    # Formal work title (blank, default = '')
    title = models.CharField(
        max_length=CHARFIELD_SHORT_LEN,
        blank=True,
        default='')

    # Account profile picture (null, blank)
    profile_picture = models.ImageField(
        blank=True,
        null=True,
        upload_to="images/",
    )

    # Scores on corporate values (blank, default = {})
    values_scores = models.JSONField(default=dict, blank=True)

    # Badges names earned by Team (blank, default = [])
    badges = \
        fields.ArrayField(
            base_field=models.CharField(max_length=CHARFIELD_SHORT_LEN), 
            default=list, 
            blank=True)

    # List of references to other Users in the same Team
    #   (blank, default = [])
    network = \
        fields.ArrayField(
            base_field=models.CharField(max_length=ID_LEN), 
            default=list, 
            blank=True)

    # Date object was created (auto, default = datetime.now() UTC time)
    date_created = models.DateTimeField(
        default=dateformat.format(timezone.now(), 'Y-m-d H:i:s'),
        auto_created=True,
        null=True)

    class Meta:
        verbose_name = "User"


class RecognitionManager(models.Manager):
    """Recognition Manager

    Manager class for Recognition model object.
    """

    def create(self, *args, **kwargs):
        """Recognition.objects.create

        - Create Recognition model object and save to database.
        - Overriding from default method.
        - Returns created Recognition object on success.
        - Reference request.uid_from and request.uid_to to related User
                objects.
        - Update 'values_scores' of User with 'uid' = request.uid_to
                with values in request.tags
        - Set 'comments' field to value in request.comments
        - Generate initial 'flag_count' to 0.
        - Generate initial 'date_created' to current UTC time.
        """

        # Referencing User by Recognition.uid_{from/to}
        # Add reference to User objects
        userFromObj = User.objects.get(uid=kwargs['uid_from'])
        userToObj = User.objects.get(uid=kwargs['uid_to'])
        kwargs['user_from'] = userFromObj
        kwargs['user_to'] = userToObj

        # Generate random 'rid'
        while True:
            # Generate a random 8-digit 'cid' until it is unique
            # Pr(collision) = 1/10^8, good enough for MVP
            kwargs['rid'] = create_unique_id(len=ID_LEN)
            if not Recognition.objects.filter(rid=kwargs['rid']).exists():
                break

        # Update scoreboard for User with uid=request.uid_to
        # Each tags for a value counts as 1 point
        for key in kwargs['tags']:
            kwargs['user_to'].values_scores[key] += 1
        kwargs['user_to'].save()

        # Create object in database
        recogObj = super(RecognitionManager, self).create(*args, **kwargs)

        return recogObj

    def get_recog_team(self, *args, **kwargs):
        """Get Recognitions In Team

        Get Recognitions that involves a Team member, either as sender
        or receiver.

        Input:
            'tid' (string) -- 8-digit Team ID

        Output:
            'recogTeamList' (list) -- List of Recognition objects
        """

        recogTeamObjList = list()
        recogQsList = Recognition.objects.all()
        for recogObj in recogQsList:
            # (Optional) Check Recognitions made after a time
            utc = pytz.utc
            recogObj.date_created = recogObj.date_created.replace(tzinfo=None)
            kwargs['time_after'] = kwargs['time_after'].replace(tzinfo=None)
            date_created = utc.localize(recogObj.date_created)
            time_after = utc.localize(kwargs['time_after'])
            condTime = \
                date_created >= time_after \
                if 'time_after' in kwargs \
                else True
            # Check involved party is part of team
            condTeam = \
                recogObj.user_from.tid == kwargs['tid'] \
                or recogObj.user_to.tid == kwargs['tid']

            # If conditions checkes out, append to list
            if condTime and condTeam:
                recogTeamObjList.append(recogObj)

        return recogTeamObjList


class Recognition(models.Model):
    """Recognition Model Object

    Fields in Company model are given below, legend table is given at line 26

    'rid' (P, *, unique, auto, default = '0'):
        - Unique 8-digit identifier for each Recognition object.
        - Primary key
    'uid_from' (*, FK):
        - Reference to related User sender object
        - Foreign key
    'uid_to' (*, FK):
        - Reference to related User receiver object
        - Foreign key
    'tags' (blank, default = []):
        - Tags chosen by sender to receiver
        - Use to update score sheet for sender
        - List of 60-char strings
    'comments' (blank, default = ''):
        - Comments left by sender to receiver
        - 120-char string (Twitter comment)
    'flag_count' (default = 0):
        - Count number of reports received by Users
        - If reached a certain urgency, manager is notified
        - Positive integer
    'date_created': (auto, default = datetime.now() UTC time)
        - Date object was created
        - Datetime
        - Date format reference at
            https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#date
    """

    # Self-defined Manager
    objects = RecognitionManager()

    # Recognition ID (P, *, unique, auto, default = '0')
    rid = models.CharField(
        primary_key=True,
        unique=True,
        max_length=ID_LEN,
        default='0',
        auto_created=True,
    )

    # Object reference to User sender object (auto)
    # Implement-as-specified by Django, not used in APIs
    user_from = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        null=True,
        auto_created=True,
        related_name="uid_from")

    # Object reference to User receiver object (auto)
    # Implement-as-specified by Django, not used in APIs
    user_to = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        null=True,
        auto_created=True,
        related_name="uid_to")

    # Object reference to User sender object (*)
    uid_from = models.CharField(max_length=ID_LEN)

    # Object reference to User receiver object (*)
    uid_to = models.CharField(max_length=ID_LEN)

    # Tags chosen by sender to receiver (blank, default = [])
    tags = \
        fields.ArrayField(
            base_field=models.CharField(max_length=CHARFIELD_SHORT_LEN), 
            default=list, 
            blank=True)

    # Count number of reports by Users (default = 0)
    flag_count = models.IntegerField(default=0, )

    # Comments from sender to receiver (blank, default = '')
    comments = models.CharField(
        max_length=CHARFIELD_LONG_LEN,
        default='',
        blank=True)

    # Date object was created (auto, default = datetime.now() UTC time)
    date_created = models.DateTimeField(
        default=dateformat.format(timezone.now(), 'Y-m-d H:i:s'),
        auto_created=True,
    )

    class Meta:
        verbose_name = "Recognition"


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

    notif_type = models.CharField(
        max_length=CHARFIELD_SHORT_LEN,
        default='',
        blank=True
    )

    seen = models.BooleanField(default=False)

    date_created = models.DateTimeField(
        auto_now_add=True,
        auto_created=True,
        null=True
    )

    class Meta:
        verbose_name = "Notification"