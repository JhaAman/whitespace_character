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


@api_view(["POST"])
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
                            'msg': "Cannot get Manager statistics: Invalid field",
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

        last_30_days = datetime.datetime.now()-datetime.timedelta(days=30)
        managerObj = User.objects.get(uid=requestDict['uid'])

        # Get Recognitions in past 30 days that involves a team member 
        #   managed by the manager
        # recogQsList = Recog.objects.get_recog_team(
        #     tid=managerObj.tid,
        #     time_after=last_30_days)   
        recogQsList = Recog.objects.get_recog_team(
            tid=managerObj.tid,
            time_after = last_30_days)

        # Get Recogition count
        recogTotal = len(recogQsList)

        # (2)

        # Get tag count distribution
        tagDistr = dict().fromkeys(managerObj.values_scores, 0)
        for recogObj in recogQsList:
            for key in recogObj.tags:
                tagDistr[key] += 1

        # (3)

        emplQsList = User.objects.filter(tid=managerObj.tid)

        # Generate Employee Stat Objects
        emplStatDictList = list()
        for emplObj in emplQsList:
            # Number of recogs this user receives
            recogInCount = \
                len(list(filter(\
                    lambda recog: recog.uid_to == emplObj.uid, \
                    recogQsList)))
            # Number of recogs this user gets
            recogOutCount = \
                len(list(filter(\
                    lambda recog: recog.uid_from == emplObj.uid, \
                    recogQsList)))
            # Sort tag count to get tag this user was most voted for
            tagCounstSortDesc = \
                sorted(
                    emplObj.values_scores.items(),
                    key=lambda kv:(kv[1], kv[0]),
                    reverse=True)
            best_tag = tagCounstSortDesc[0][0] # sorting dict -> tuple
            # Create Employee Stat object and check field validity
            emplStatDict = {
                'uid': emplObj.uid,
                'first_name': emplObj.first_name,
                'last_name': emplObj.last_name,
                'profile_picture': None, # TODO: Figure how to return profle pic
                'recogInCount': recogInCount,
                'recogOutCount': recogOutCount,
                'best_tag': str(best_tag)
            }
            emplStatSrl = EmplStatSrl(data=emplStatDict)
            lc = emplStatSrl.is_valid(raise_exception=True)
            emplStatDict = emplStatSrl.validated_data
            # Add Employee Stat object to list
            emplStatDictList.append(emplStatDict)

        mngStatSrl = MngStatSrl(data={
            'recogTotal': recogTotal,
            'tagDistr': tagDistr,
            'empls': emplStatDictList})
        lc = mngStatSrl.is_valid(raise_exception=True)
        mngStatDict = mngStatSrl.validated_data

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
                        'msg': "Cannot get Manager statistics: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)