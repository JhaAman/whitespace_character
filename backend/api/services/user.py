import io
import json

from django.http import JsonResponse
from django.contrib.auth.models import User as AuthUser
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from api.db.models import *
from api.db.serializers import UidFormSerializer


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


@api_view(["POST"])
def create_user(request):
    try:
        # Serialize incoming request data
        userSrl = UserSerializer(data=request.data)

        # If request data fields are valid:
        if userSrl.is_valid():
            # Save object to User database
            userSrl.save()

            userJson = userSrl.validated_data

            # Creating fields for Auth object
            authObjFields  = {
                'id': userJson["uid"],
                'first_name': userJson["first_name"],
                'last_name': userJson["last_name"],
                'is_staff': userJson["user_role"] == "mng" 
                    or userJson["user_role"] == "manager",
                'password': make_password(userJson["password"]),
                'email': userJson["email"],
            }
            AuthUser.objects.create(**authObjFields)

            return Response(None, status.HTTP_201_CREATED)

        return Response(userJson.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)

    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def create_users(request):
    try:
        users = json.loads(request.body)['users']
        for user in users:
            serializer = UserSerializer(data=user)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_users(request):
    try:
        qs = User.objects.all()
        serializer = UserSerializer(qs, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_user(request):
    try:
        serializer = UidFormSerializer(data=request.data)
        if serializer.is_valid():
            userObj = User.objects.get(uid=serializer.data['uid'])

            # update user network
            network = [ UserSerializer(user).data['uid'] for user in User.objects.filter(tid=userObj.tid) ]
            userObj.network=network
            userObj.save()

            # serialize user object
            userJson = UserSerializer(instance=userObj).data

            # return view
            return Response(data=userJson, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)