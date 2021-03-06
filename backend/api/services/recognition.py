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
import jwt
import os

import jwt
import os

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.helpers.badges import updateBadges
from api.helpers.notifications import make_notification
import json
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from api.db.models import \
    Company as Comp,\
    Team,\
    User,\
    Recognition as Recog
from api.db.serializers import \
    UserSerializer as UserSrl, \
    RecognitionSerializer as RecogSrl, \
    ApiResponseSerializer as ApiRespSrl, \
    UidFormSerializer as UidFormSrl, \
    RidFormSerializer as RidFormSrl


@api_view(["POST"])
def create(request):
    try:
        # Serializer incoming request data
        requestSrl = RecogSrl(data=request.data)

        # If request data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data= \
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot create Recognition object: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Save object to database
        requestSrl.save()
        make_notification("Received a recognition from {name}".format(name=User.objects.get(uid=request.data['uid_from']).first_name), request.data['uid_to'], 'recognition_notif')
        # Return success report
        return \
            Response(
                data= \
                    ApiRespSrl({
                        'status': status.HTTP_201_CREATED,
                        'msg': "Created Recognition object"
                    }).data,
                status=status.HTTP_201_CREATED)

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


@api_view(["POST"])
def create_batch(request):
    try:
        # Serializer incoming request data
        requestSrl = RecogSrl(data=request.data, many=True)

        # If request data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data= \
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot create batch Recognition object: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Get validated data
        recogDictList = requestSrl.validated_data
        # Create new User for each requested object
        for recogDict in recogDictList:
            Recog.objects.create(**recogDict).save()
        # Return success report
        return \
            Response(
                data= \
                    ApiRespSrl({
                        'status': status.HTTP_201_CREATED,
                        'msg': "Created batch Recognition object"
                    }).data,
                status=status.HTTP_201_CREATED)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot create batch Recognition object: Exception occured",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_batch(request):
    try:
        # Serialize incoming request data
        uid = request.query_params["uid"]
        data = {"uid":uid}
        requestSrl = UidFormSrl(data=data)
        
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
                        'msg': "Retrieved batch Recognition object",
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
                        'msg': "Cannot create batch Recognition object: Exception ocurred",
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
        recogObjList = Recog.objects.all().order_by('-date_created')
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

@api_view(["GET"])
def get_tags(request):
    try:
        token = request.META.get('HTTP_AUTHORIZATION').replace("Bearer ","")
        uid = jwt.decode(token, os.environ.get('SECRET_KEY'), os.environ.get('ALGORITHM'))["user_id"]
        if not uid == 1:
            tid = User.objects.get(uid = uid).tid
            cid = Team.objects.get(tid = tid).cid
            tags = Comp.objects.get(cid = cid).values
            return Response(tags,status=status.HTTP_200_OK)
        else:
            return Response(None, status.HTTP_401_UNAUTHORIZED)
    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot fetch Company object: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)