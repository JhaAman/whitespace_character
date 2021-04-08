""" Model Object Classes

Org: Team Whitespace Character
Authors: Khai Nguyen, khainguyen@umass.edu
Created: April 4th, 2021

There are 5 main model objects:
        Company, Team, User, Recognition

Detailed data schema can be found at:
        https://dbdiagram.io/d/60516c4becb54e10c33bc840
"""

from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.postgres import fields

from rest_framework import serializers

from api.db.constant import *
from api.db.utils import create_unique_id


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

        # Create template
        companyObj = Company(**kwargs)

        # Generate unique 'cid'
        while True:
            # Generate a random 8-digit 'cid' until it is unique
            # Pr(collision) = 1/10^8, good enough for MVP
            companyObj.cid = create_unique_id(len=ID_LEN)
            if not Company.objects.filter(cid=companyObj.cid).exists():
                break

        # Create object in database
        companyObj.save()

        return companyObj


class Company(models.Model):
    """Company Model Object

    Fields in Company model are given below, notices are specified in
            the following legend:

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
        auto_now_add=True,
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

        # Create template:
        teamObj = Team(**kwargs)

        # Add primary key reference to parent Company:
        companyObj = Company.objects.get(cid=teamObj.cid)
        teamObj.company = companyObj

        # Generate random 'tid':
        while True:
            # Generate a random 8-digit 'cid' until it is unique
            # Pr(collision) = 1/10^8, good enough for MVP
            teamObj.tid = create_unique_id(len=ID_LEN)
            if not Team.objects.filter(tid=teamObj.tid).exists():
                break

        # Generate initial 'values_scores'
        valueList = companyObj.values
        teamObj.values_scores = dict().fromkeys(valueList, 0)

        # Generate initial 'badges'
        teamObj.badges = list()

        # Create object in database
        teamObj.save()

        return teamObj


class Team(models.Model):
    """Team Model Object

    Fields in Team model are given below, notices are specified in the
            following legend:

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
    """

    # Self-defined Manager
    objects = TeamManager()

    # Object reference to parent Company object (auto)
    # Implement-as-specified by Django, not used in APIs
    company = models.ForeignKey(
        to=Company,
        on_delete=models.SET_NULL,
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
        auto_now_add=True,
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
        - Overriding from default method.
        - Returns created User object on success.
        - Reference primary key at parent Team model object.
        - Generate initial 'values_scores' where keys are specified by
                parent Company mode, and values are set to 0.
        - Generate initial empty list 'badges'.
        - Generate initial 'date_created' to current UTC time.
        """

        # Create template
        userObj = User(**kwargs)

        # Add primary key reference to Team object
        teamObj = Team.objects.get(tid=userObj.tid)
        userObj.team = teamObj

        # Generate unique 'uid'
        while True:
            # Generate a random 8-digit 'cid' until it is unique
            # Pr(collision) = 1/10^8, good enough for MVP
            userObj.uid = create_unique_id(len=ID_LEN)
            if not User.objects.filter(uid=userObj.uid).exists():
                break

        # Generate initial 'values_scores'
        companyObj = Company.objects.get(cid=teamObj.cid)
        valueList = companyObj.values
        userObj.values_scores = dict().fromkeys(valueList, 0)

        # Generate initial list 'badges'
        userObj.badges = list()

        # Generate initial list 'network'
        networkQsList = User.objects.filter(tid=userObj.tid)
        networkObjList = list(networkQsList)
        userObj.network = networkObjList

        # Create object in database
        userObj.save()

        return userObj


class User(models.Model):
    """User Model Object

    Fields in User model are given below, notices are specified in the
            following legend:

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
    """

    # Self-defined Manager
    objects = UserManager()

    # Object reference to parent Company object (auto)
    # Implement-as-specified by Django, not used in APIs
    team = models.ForeignKey(
        to=Team,
        on_delete=models.SET_NULL,
        null=True,
        auto_created=True,
    )

    # Reference to parent Team object (*, FK)
    tid = models.CharField(max_length=ID_LEN, blank=False)

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
        default='emp')

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
            blank=True, 
            null=False)

    # List of references to other Users in the same Team
    #       (blank, default = [])
    network = \
        fields.ArrayField(
            base_field=models.CharField(max_length=ID_LEN), 
            default=list, 
            blank=True, 
            null=False)

    # Date object was created (auto, default = datetime.now() UTC time)
    date_created = models.DateTimeField(auto_now_add=True,
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

        # Create template
        recogObj = Recognition(**kwargs)

        # Referencing User by Recognition.uid_{from/to}
        # Add reference to User objects
        userFromObj = User.objects.get(uid=recogObj.uid_from)
        userToObj = User.objects.get(uid=recogObj.uid_to)
        recogObj.user_from = userFromObj
        recogObj.user_to = userToObj

        # Generate random 'rid'
        while True:
            # Generate a random 8-digit 'cid' until it is unique
            # Pr(collision) = 1/10^8, good enough for MVP
            recogObj.rid = create_unique_id(len=ID_LEN)
            if not Recognition.objects.filter(rid=recogObj.rid).exists():
                break

        # Update scoreboard for User with uid=request.uid_to
        # Each tags for a value counts as 1 point
        for key in kwargs['tags']:
            recogObj.user_to.values_scores[key] += 1
        recogObj.user_to.save()

        # Create object in database
        recogObj.save()

        return recogObj


class Recognition(models.Model):
    """Recognition Model Object

    Fields in User model are given below, notices are specified in the
            following legend:

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
        related_name="userid_from")

    # Object reference to User receiver object (auto)
    # Implement-as-specified by Django, not used in APIs
    user_to = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        null=True,
        auto_created=True,
        related_name="userid_to")

    # Object reference to User sender object (*)
    uid_from = models.CharField(
        max_length=ID_LEN,
        blank=False,
    )

    # Object reference to User receiver object (*)
    uid_to = models.CharField(max_length=ID_LEN, )

    # Tags chosen by sender to receiver (blank, default = [])
    tags = \
        fields.ArrayField(
            base_field=models.CharField(max_length=CHARFIELD_SHORT_LEN), 
            default=list, 
            blank=True, 
            null=False)

    # Count number of reports by Users (default = 0)
    flag_count = models.IntegerField(default=0, )

    # Comments from sender to receiver (blank, default = '')
    comments = models.CharField(
        max_length=CHARFIELD_LONG_LEN,
        default='',
        blank=True)

    # Date object was created (auto, default = datetime.now() UTC time)
    date_created = models.DateTimeField(
        auto_now_add=True,
        auto_created=True,
    )

    class Meta:
        verbose_name = "Recognition"
