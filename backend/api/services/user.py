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

from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from api.db.models import User
from api.db.serializers \
    import UserSerializer, UidFormSerializer, ApiResponseSerializer


@api_view(["POST"])
def create_user(request):
    try:
        # Serialize incoming request data
        requestSrl = UserSerializer(data=request.data)

        # If request data fields are valid:
        if requestSrl.is_valid():
            # Save object to User database
            requestSrl.save()
            # Return success report
            return \
                Response(
                    data=
                        ApiResponseSerializer({
                            'status': status.HTTP_200_OK,
                            'msg': "Created User object"
                        }).data,
                    status=status.HTTP_201_CREATED)

        # If data fields are invalid, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                        'msg': "Cannot create User object: Invalid field",
                        'trace': requestSrl.errors
                    }).data,
                status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot create User object: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def create_users(request):
    try:
        # Serialize incoming request data
        requestSrl = UserSerializer(data=request.data, many=True)
        # If request data fields are valid
        if requestSrl.is_valid():
            # Get validated data
            requestJson = requestSrl.validated_data
            # Create new User for each requested object
            for userObj in requestJson:
                userObj.save()
            # Return success report
            return \
                Response(
                    data=
                        ApiResponseSerializer({
                            'status': status.HTTP_200_OK,
                            'msg': "Created batch User objects"
                        }).data,
                    status=status.HTTP_201_CREATED)

        # If data fields are invalid, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                        'msg': "Cannot create batch User objects: Invalid field",
                        'trace': requestSrl.errors
                    }).data,
                status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot batch User objects: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_users(request):
    try:
        # Fetch User objects from database
        userObjList = User.objects.all()
        # Deserialize User objects to be send through API
        userJsonList = UserSerializer(userObjList, many=True).data
        # Return success report
        return \
            Response(
                data= \
                    ApiResponseSerializer({
                        'status': status.HTTP_201_CREATED,
                        'msg': "Fetched all users in database",
                        'data': userJsonList
                    }),
                status=status.HTTP_201_CREATED)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot fetch all users in \
                            database: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_user(request):
    try:
        requestSrl = UidFormSerializer(data=request.data)
        if requestSrl.is_valid():
            # Get validated request data
            requestJson = requestSrl.validated_data
            # Fetch User objects from database
            userObj = User.objects.get(requestJson['uid'])
            # Deserialize User objects to be send through API
            userJson = UserSerializer(userObj).data
            # Return success report
            return \
                Response(
                    data= \
                        ApiResponseSerializer({
                            'status': status.HTTP_200_OK,
                            'msg': "Fetched requested user",
                            'data': userJson
                        }),
                    status=status.HTTP_200_OK)

        # If data fields are invalid, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                        'msg': "Cannot fetch requested user: Invalid field",
                        'trace': requestSrl.errors
                    }).data,
                status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot fetch requested user: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)