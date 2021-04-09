"""User Endpoints

Org: Team Whitespace Character
Authors: 
    Khai Nguyen, khainguyen@umass.edu
    Myron Lacey, 
    Duy Pham,
    Khang Nguyen, 
Created: April 4th, 2021

API endpoints in service of User model object
"""

import io
import json
import datetime

from django.db.models import Q

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import ValidationError
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from api.db.models import \
    User, \
    Recognition as Recog
from api.db.serializers import \
    UserSerializer as UserSrl, \
    UidFormSerializer as UidFormSrl, \
    ApiResponseSerializer as ApiRespSrl, \
    RecognitionSerializer as RecogSrl, \
    EmployeeStatisticsSerializer as EmplStatSrl, \
    ManagerStatisticsSerializer as MngStatSrl
from api.db.utils import to_json


@api_view(["POST"])
def create(request):
    try:
        # Serialize incoming request data
        requestSrl = UserSrl(data=request.data)

        # If data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data=
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot create User object: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Save object to User database
        requestSrl.save()
        # Return success report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_201_CREATED,
                        'msg': "Created User object"
                    }).data,
                status=status.HTTP_201_CREATED)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot create User object: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def create_batch(request):
    try:
        # Serialize incoming request data
        requestSrl = UserSrl(data=request.data, many=True)

        # If data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data=
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot create batch User objects: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Get validated data
        userDictList = requestSrl.validated_data
        # Create new User for each requested object
        for userDict in userDictList:
            User.objects.create(**userDict).save()
        # Return success report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_200_OK,
                        'msg': "Created batch User objects"
                    }).data,
                status=status.HTTP_201_CREATED)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot batch User objects: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def all(request):
    try:
        # Fetch User objects from database
        userQsList = User.objects.all()
        # Deserialize User objects to be send through API
        userDictList = UserSrl(userQsList, many=True).data
        userJsonList = to_json(userDictList)
        # Return success report
        return \
            Response(
                data= \
                    ApiRespSrl({
                        'status': status.HTTP_200_OK,
                        'msg': "Fetched all users in database",
                        'data': userDictList
                    }).data,
                status=status.HTTP_200_OK)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot fetch all users in database: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get(request):
    try:
        # Serialize incoming request data
        requestSrl = UidFormSrl(data=request.data)

        # If data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data=
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot fetch requested user: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Get validated request data
        requestDict = requestSrl.validated_data
        # Fetch User objects from database
        userObj = User.objects.get(uid=requestDict['uid'])
        # Deserialize User objects to be send through API
        userDict = UserSrl(userObj).data
        userJson = to_json(userDict)
        # Return success report
        return \
            Response(
                data= \
                    ApiRespSrl({
                        'status': status.HTTP_200_OK,
                        'msg': "Fetched requested user",
                        'data': userDict
                    }).data,
                status=status.HTTP_200_OK)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot fetch requested user: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def mng_stats(request):
    try:
        # Serializer incoming request data
        requestSrl = UidFormSrl(data=request.data)

        # If data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data=
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot create Company object: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Get validated data
        requestDict = requestSrl.data

        # Statistics include:
        #   (1) Total # of recognitions
        #   (2) Tag count distribution
        #   (3) Employees ranked by # of recognitions given

        # (1)
        # Get # of recognitions made by employees in last 30 days
        # Employees are User with 'mid' = request.data['uid']
        last_30_days = datetime.datetime.now()-datetime.timedelta(days=30)
        recogQsList = \
            Recog.objects.filter(\
                Q(date_created__gt=last_30_days) | Q(mid=requestDict['uid']))
        recogTotal = len(recogQsList)
        # Get scoresheet template from manager
        userObj = User.objects.get(uid=requestDict['uid'])
        tagDistr = dict().fromkeys(userObj.values_scores, 0)

        # (2)
        # Tally up tag counts
        recogObjList = RecogSrl(recogQsList, many=True).data
        for recogObj in recogObjList:
            for key in recogObj.tags:
                tagDistr[key] += 1

        # (3)
        # Get Employee statistics
        userQsList = User.objects.filter(mid=requestDict['uid'])
        userDictList = UserSrl(userQsList).data
        emplStatDictList = list()
        for userDict in userDictList:
            # Get # of recognitions received
            recogInCount = \
                len(Recog.objects.filter(uid_to=userDict.uid))
            # Get $ of recognitions sent
            recogOutCount = \
                len(Recog.objects.filter(uid_from=userDict.uid))
            # Sort desc 'values_scores' to get most voted tags
            tagCounstSortDesc = \
                sorted(
                    userDict.values_scores.items(),
                    key=lambda kv:(kv[1], kv[0]),
                    reverse=True)
            # Get first item to be 'best_key'
            best_key = tagCounstSortDesc.keys()[0]
            # Build Employee Stat JSON
            emplStatDict = \
                {
                    'first_name': userDict.first_name,
                    'last_name': userDict.last_name,
                    'profile_picture': userDict.profile_picture,
                    'recogInCount': recogInCount,
                    'recogOutCount': recogOutCount,
                    'best_tag': best_key
                }
            # Insert to list
            emplStatDictList.append(emplStatDict)
        # Sort Employee statistics by 'recogInCount'
        emplStatDictList = \
            sorted(
                emplStatDictList,
                key=lambda emplStatObj: emplStatObj['recogInCount'],
                reverse=True)      
        # Serialize Employee Stat data
        emplStatSrl = EmplStatSrl(data=emplStatDictList)
        # Check if Employee Stat list is valid
        # If not, raise ValidationError      
        lc = emplStatSrl.is_valid(raise_exception=True) # assigns to supress print
        emplStatDictList = emplStatSrl.validated_data

        # Build Manager Stat JSON
        mngStatDict = \
            {
                'recogTotal': recogTotal,
                'tagDistr': tagDistr,
                'empls': emplStatDictList
            }

        # Serialize Manager Stat data
        mngStatSrl = MngStatSrl(data=mngStatDict)
        # Check if Employee Stat list is valid
        # If not, raise ValidationError  
        lc = mngStatSrl.is_valid(raise_exception=True) # assigns to supress print
        mngStatDict = mngStatSrl.validated_data
        # Deserialize Manager Stat data
        mngStatJson = to_json(mngStatDict)

        # Return success report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_200_OK,
                        'msg': "Fetched Manager statistics",
                        'data': mngStatDict
                    }).data,
                status=status.HTTP_200_OK)

    except Exception as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot fetch requested user: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)