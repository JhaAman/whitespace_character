""" Serializer Classes

Org: Team Whitespace Character
Authors:
    Khai Nguyen, khainguyen@umass.edu
    Duy Pham,
    Myron Lacey,
Created: April 4th, 2021

There are 5 model serializers:
    CompanySerializer, TeamSerializer, UserSerializer, RecognitionSerializer

Serializer classes to handle API requests:
    UidFormSerializer, TidFormSerializer, RidFormSerializer,
    CidFormSerializer,

Serializer classes to handle views:
    HomePostView

Detailed data schema can be found at:
    https://dbdiagram.io/d/60516c4becb54e10c33bc840
"""

from rest_framework import serializers, status

import api.db.models as models
import api.db.constant as const


class CompanySerializer(serializers.ModelSerializer):
    """Company Model Serializer

    Serializer class for Company model object.

    Practical fields are as follows:
        'cid', 'name', 'values', 'badges'
    """

    class Meta:
        model = models.Company
        fields = ['cid', 'name', 'values', 'badges']


class TeamSerializer(serializers.ModelSerializer):
    """Team Model Serializer

    Serializer class for Team model object.

    Practical fields are as follows:
        'cid', 'tid', 'name', 'values_scores', 'badges'
    """

    def validate_cid(self, value):
        """Validator for Team.cid

        - Check if Company object with 'cid'=request.cid
        - On failure, raise ValidationError.
        """
        if not models.Company.objects.get(cid=value):
            raise \
                serializers.ValidationError(\
                    "Company ID not found",
                    code="not found")
        return value

    class Meta:
        model = models.Team
        fields = ['cid', 'tid', 'name', 'values_scores', 'badges']


class UserSerializer(serializers.ModelSerializer):
    """User Model Serializer

    Serializer class for User model object.

    Practical fields are as follows:
        'tid', 'uid', 'first_name', 'last_name', 'email', 'title'
        , 'badges', 'network', 'values_scores', 'profile_picture'
    """

    def validate_tid(self, value):
        """Validator for Team.tid

        - Check if Team object with 'tid'=request.tid
        - On failure, raise ValidationError.
        """

        if not models.Team.objects.filter(tid=value).exists():
            raise \
                serializers.ValidationError(\
                    "Team ID not found",
                    code="not found")
        return value

    class Meta:
        model = models.User
        fields = [
            'tid', 'uid', 'first_name', 'last_name', 'email', 'title', 'badges'
            , 'network', 'values_scores', 'profile_picture']


class RecognitionSerializer(serializers.ModelSerializer):
    """Recognition Model Serializer

    Serializer class for Recognition model object.

    Practical fields are as follows:
        'rid', 'uid_from', 'uid_to', 'tags', 'comments', 'date_created'
    """

    def validate_uid_from(self, value):
        """Validator for Recognition.uid_from

        - Check if User object with 'uid'=request.uid_from
        - On failure, raise ValidationError.
        """

        if not models.User.objects.filter(uid=value).exists():
            raise \
                serializers.ValidationError(
                    "uid_from not found",
                    code="not found")
        return value

    def validate_uid_to(self, value):
        """Validator for Recognition.uid_to

        - Check if User object with 'uid'=request.uid_to
        - On failure, raise ValidationError.
        """
        if not models.User.objects.filter(uid=value).exists():
            raise \
                serializers.ValidationError(
                    "uid_to not found",
                    code="not found")
        return value

    def validate(self, data):
        """General Validator For Recognition object

        - Check sender != receiver
        - Check tags are valid:
                + Specified by parent Company object
                + Under 60-char long
        - On failure, raise ValidationError.
        """

        # Check uid_from is different from uid_to
        if data['uid_from'] == data['uid_to']:
            raise \
                serializers.ValidationError(
                    "uid_from and uid_to must be different", 
                    code="invalid")

        # Check valid tags
        userRef = models.User.objects.get(uid=data['uid_from'])
        teamRef = models.Team.objects.get(tid=userRef.tid)
        companyRef = models.Company.objects.get(cid=teamRef.cid)
        tagsActual = companyRef.values
        for key in data['tags']:
            if key not in tagsActual:
                raise \
                    serializers.ValidationError(
                        detail=\
                            "\'{key}\' tag is not specified by organization".format(key=key),
                        code="invalid")
        return data


    class Meta:
        model = models.Recognition
        fields = ['rid', 'uid_from', 'uid_to', 'tags', 'comments'
        , 'date_created']


class UidFormSerializer(serializers.Serializer):
    """UID Form Serializer

    Contains the following fields:
        'uid' (string): 
            8-digit ID
    """

    uid = serializers.CharField(
        required=True, 
        min_length=8, 
        max_length=8)

    def validate_uid(self, value):
        """Validator for User.uid

        - Check if User object with 'uid'=request.uid
        - On failure, raise ValidationError.
        """
        if not models.User.objects.filter(uid=value).exists():
            raise serializers.ValidationError(
                "{id} user id does not exist".format(id=value))
        return value


class RidFormSerializer(serializers.Serializer):
    """RID Form Serializer

    Contains the following fields:
        'rid' (string): 
            8-digit ID
    """

    rid = serializers.CharField(
        required=True, 
        min_length=8, 
        max_length=8)

    def validate_rid(self, value):
        """Validator for Recognition.rid

        - Check if Recognition object with 'rid'=request.rid
        - On failure, raise ValidationError.
        """

        if not models.Recognition.objects.filter(rid=value).exists():
            raise \
                serializers.ValidationError(
                    detail=\
                        "\'{id}\' Recognition ID does not exist".format(id=value), 
                    code="invalid")
        return value


class CidFormSerializer(serializers.Serializer):
    """CID Form Serializer

    Contains the following fields:
        'cid' (string): 
            8-digit ID
    """

    cid = serializers.CharField(
        required=True, 
        min_length=8, 
        max_length=8)

    def validate_cid(self, value):
        """Validator for Company.cid

        - Check if Company object with 'cid'=request.cid
        - On failure, raise ValidationError.
        """

        if not models.Company.objects.filter(cid=value).exists():
            raise \
                serializers.ValidationError(
                    detail="\'{id}\' Company ID does not exist".format(id=value), 
                    code="invalid")
        return value


class TeamFormSerializer(serializers.Serializer):
    """TID Form Serializer

    Contains the following fields:
        'tid' (string): 
            8-digit ID
    """

    tid = serializers.CharField(
        required=True, 
        min_length=8, 
        max_length=8)

    def validate_tid(self, value):
        """Validator for Team.tid

        - Check if Team object with 'tid'=request.tid
        - On failure, raise ValidationError.
        """

        if not models.Team.objects.filter(tid=value).exists():
            raise \
                serializers.ValidationError(
                    detail="\'{id}\' Team ID does not exist".format(id=value), 
                    code="invalid")
        return value


class ManagerStatisticsSerializer(serializers.Serializer):
    """Team Statistics Serializer

    Contains the following fields:
        'recogTotal' (number): 
            Number of recognitions in past 30 days.
        'tagDistr' (dict): 
            Distribution of tags used in past 30 days sorted by 
            decreasing count. 
        'empls' (User): 
            List of employees under a manager ranked by number of of 
            recogitions made in past 30 days.
    """

    recogTotal = serializers.IntegerField(
        required=True, 
        min_value=0)
    tagDistr = serializers.DictField(
        child=serializers.CharField(),
        allow_null=True)
    empls = serializers.ListField(
        child=serializers.JSONField(),
        allow_null=True)


class EmployeeStatisticsSerializer(serializers.Serializer):
    """Employee Statistics Serializer
    
    Contains the following fields:
        'first_name' (string): 
            First name.
        'last_name' (string): 
            Last name.
        'profile_picture' (image): 
            Profile picture
        'recogInCount' (number): 
            # of recognitions made by this Employee for last 30 days.
        'recogOutCount' (number): 
            # of recognitions received by this Employee for last 30 days.
        'best_tag' (string): 
            Tag that this Employee was most recognized for. If multiple 
            tags fits the description, a random one will be chosen. 
    """

    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    profile_picture = serializers.ImageField(allow_empty_file=True)
    recogInCount = serializers.IntegerField(required=True, min_value=0)
    recogOutCount = serializers.IntegerField(required=True, min_value=0)
    best_tag = serializers.CharField(required=True)


class ApiResponseSerializer(serializers.Serializer):
    """API Report Form

    Contains the following fields:
        'status' (number): 
            HTTP status of error
        'msg' (string): 
            Short description of error (string)
        'data' (JSON): 
            Retrieved data on success call
        'trace' (JSON): 
            Stack trace for error report
    """

    status = serializers.CharField(required=True)
    msg = serializers.CharField(required=True)
    data = serializers.JSONField(allow_null=True)
    trace = serializers.JSONField(allow_null=True)


class HomePostSerializer(serializers.Serializer):
    """Home Post Form

    Contains the following fields:
        'user' (JSON): 
            Deserialized User object (=> see User model)
        'recogs': 
            List of all Recognitions objects for User
    """

    user = serializers.JSONField(required=True)
    recogs = serializers.ListField(
        child=serializers.JSONField(),
        allow_null=True)
