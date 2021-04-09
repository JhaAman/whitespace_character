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
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from api.db.models import User, Recognition
from api.db.serializers \
    import UserSerializer, RecognitionSerializer, ApiResponseSerializer \
    , UidFormSerializer, RidFormSerializer


@api_view(["POST"])
def create_recognition(request):
    try:
        # Serializer incoming request data
        requestSrl = RecognitionSerializer(data=request.data)

        # If request data fields are valid
        if requestSrl.is_valid():
            # Save object to database
            requestSrl.save()
            # Return success report
            return \
                Response(
                    data= \
                        ApiResponseSerializer({
                            'status': status.HTTP_201_CREATED,
                            'msg': "Created Recognition object"
                        }),
                    status=status.HTTP_201_CREATED)

        # If request data fields are invalid, return error report
        return \
            Response(
                data= \
                    ApiResponseSerializer({
                        'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                        'msg': "Cannot create Company object: Invalid field",
                        'trace': requestSrl.errors
                    }),
                status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot create Recognition object: Invalid field",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_user_recognitions(request):
    try:
        # Serialize incoming request data
        requestSrl = UidFormSerializer(data=request.data)

        # If request data fields are valid
        if requestSrl.is_valid():
            # Get User object with 'uid'
            requestJson = UserSerializer(requestSrl).validated_data
            userQs = User.objects.get(uid=requestJson['uid'])
            userJson = UserSerializer(userQs).data
            # Get recognitions for requested user
            recogQsList = Recognition.objects.filter(
                uid_to=userJson['uid'])
            recogObjList = \
                RecognitionSerializer(
                    recogQsList,
                    many=True
                ).data
            # Return success report
            return \
                Response(
                    data= \
                        ApiResponseSerializer({
                            'status': status.HTTP_201_CREATED,
                            'msg': "Retrieved Recognition object",
                            'data': recogObjList
                        }),
                    status=status.HTTP_201_CREATED)

        # If request data fields are invalid, return error report
        return \
            Response(
                data= \
                    ApiResponseSerializer({
                        'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                        'msg': "Cannot fetch user recognitions: Invalid field",
                        'trace': requestSrl.errors
                    }),
                status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot create Company object: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def put_flag_recognition(request):
    try:
        # Serializing incoming request data
        requestSrl = RidFormSerializer(data=request.data)

        # If request data fields are valid
        if requestSrl.is_valid():
            requestJson = requestSrl.validated_data
            recogObj = Recognition.objects.get(uid=requestJson['rid'])
            # Increase flag count by 1
            recogObj.objects.update(flag_count=recogObj.flag_count + 1)
            # Return success report
            return \
                Response(
                    data= \
                        ApiResponseSerializer({
                            'status': status.HTTP_201_CREATED,
                            'msg': "Increased flag count for recognition"
                        }),
                    status=status.HTTP_201_CREATED)

        # If request data fields are invalid, return error report
        return \
            Response(
                data= \
                    ApiResponseSerializer({
                        'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                        'msg': "Cannot increase flag count: Invalid field",
                        'trace': requestSrl.errors
                    }),
                status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot increase flag count: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_all_recognitions(request):
    try:
        recogObjList = Recognition.objects.all()
        recogJsonList = RecognitionSerializer(recogObjList, many=True).data
        return \
            Response(
                data= \
                    ApiResponseSerializer({
                        'status': status.HTTP_201_CREATED,
                        'msg': "Fetched all recognitions in database",
                        'data': recogJsonList
                    }),
                status=status.HTTP_201_CREATED)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot fetch all recognitions in \
                            database: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)