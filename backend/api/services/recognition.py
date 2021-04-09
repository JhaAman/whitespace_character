"""Recognition Endpoints

Org: Team Whitespace Character
Authors: 
    Khai Nguyen, khainguyen@umass.edu
    Myron Lacey, 
    Duy Pham,
    Khang Nguyen, 
Created: April 4th, 2021

API endpoints in service of Recognition model object
"""

import io

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.helpers.badges import updateBadges
from api.helpers.notifications import makeNotification
import json
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
<<<<<<< HEAD
from api.models.User import *
from api.models.Recognition import *
from api.models.ApiSerializers import UidFormSerializer, RidFormSerializer

import io
=======

from api.db.models import \
    User, \
    Recognition as Recog
from api.db.serializers import \
    UserSerializer as UserSrl, \
    RecognitionSerializer as RecogSrl, \
    ApiResponseSerializer as ApiRespSrl, \
    UidFormSerializer as UidFormSrl, \
    RidFormSerializer as RidFormSrl
>>>>>>> origin/feat/feed


@api_view(["POST"])
def create(request):
    try:
<<<<<<< HEAD
        serializer = RecognitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            updateBadges(serializer.data['uid_to'], serializer.data['uid_from'])
            makeNotification("You received a recognition from " + User.objects.get(uid=serializer.data['uid_from']).first_name, serializer.data['uid_to'], "recognition_notif")
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
=======
        # Serializer incoming request data
        requestSrl = RecogSrl(data=request.data)

        # If request data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data= \
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot create Company object: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Save object to database
        requestSrl.save()
        # Return success report
        return \
            Response(
                data= \
                    ApiRespSrl({
                        'status': status.HTTP_201_CREATED,
                        'msg': "Created Recognition object"
                    }).data,
                status=status.HTTP_201_CREATED)

>>>>>>> origin/feat/feed
    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot create Recognition object: Exception occured",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_batch(request):
    try:
        # Serialize incoming request data
        requestSrl = UidFormSrl(data=request.data)

        # If request data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data= \
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot fetch user recognitions: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            
        # Get User object with 'uid'
        requestDict = requestSrl.validated_data
        userQs = User.objects.get(uid=requestDict['uid'])
        userDict = UserSrl(userQs).data
        # Get recognitions for requested user
        recogQsList = Recog.objects.filter(
            uid_to=userDict['uid'])
        recogObjList = \
            RecogSrl(
                recogQsList,
                many=True
            ).data
        # Return success report
        return \
            Response(
                data= \
                    ApiRespSrl({
                        'status': status.HTTP_200_OK,
                        'msg': "Retrieved Recognition object",
                        'data': recogObjList
                    }).data,
                status=status.HTTP_200_OK)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot create Company object: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def put_flag(request):
    try:
        # Serializing incoming request data
        requestSrl = RidFormSrl(data=request.data)

        # If request data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data= \
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot increase flag count: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Get validated data
        requestDict = requestSrl.validated_data
        recogObj = Recog.objects.get(rid=requestDict['rid'])
        # Increase flag count by 1
        recogObj.flag_count += 1
        recogObj.save()
        # Return success report
        return \
            Response(
                data= \
                    ApiRespSrl({
                        'status': status.HTTP_200_OK,
                        'msg': "Increased flag count for recognition"
                    }).data,
                status=status.HTTP_200_OK)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot increase flag count: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def all(request):
    try:
        recogObjList = Recog.objects.all()
        recogDictList = RecogSrl(recogObjList, many=True).data
        return \
            Response(
                data= \
                    ApiRespSrl({
                        'status': status.HTTP_201_CREATED,
                        'msg': "Fetched all recognitions in database",
                        'data': recogDictList
                    }).data,
                status=status.HTTP_201_CREATED)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot fetch all recognitions in database: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)