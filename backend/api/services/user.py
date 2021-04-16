from rest_framework.decorators import parser_classes, api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser, MultiPartParser, FileUploadParser
from rest_framework.renderers import JSONRenderer

from api.models.User import *
from api.models.ApiSerializers import UidFormSerializer

import io, json
import jwt
import os

from api.models.User import User
from api.models.User import UserSerializer
from django.contrib.auth.models import User as AuthUser
from django.contrib.auth.hashers import make_password

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


@swagger_auto_schema(method='post', 
    manual_parameters=[
        openapi.Parameter(
            name='first_name', in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="user's first name",
            required=True
        ),
        openapi.Parameter(
            name='last_name', in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="user's last name",
            required=True
        ),
        openapi.Parameter(
            name='email', in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="user's email",
            required=True
        ),
        openapi.Parameter(
            name='password', in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="user's password",
            required=True
        ),
        openapi.Parameter(
            name='tid', in_=openapi.IN_FORM,
            type=openapi.TYPE_STRING,
            description="user's valid team id",
            required=True
        ),
        openapi.Parameter(
            name='profile_picture', in_=openapi.IN_FORM,
            type=openapi.TYPE_FILE,
            description="user's profile picture"
        )
    ], 
    responses={
        status.HTTP_422_UNPROCESSABLE_ENTITY: openapi.Response(
            description="If one of the required field is missing or there are conflict/invalid information"
        ),
        status.HTTP_201_CREATED: openapi.Response(
            description="When user created successfully",
        )
    }
)
@api_view(["POST"])
@parser_classes([MultiPartParser, FileUploadParser])
def create_user(request):
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            password = make_password(serializer["password"].value)
            user = serializer["email"].value
            first_name = serializer["first_name"].value
            last_name = serializer["last_name"].value
            check = False
            if serializer["user_role"].value == "mng" or serializer["user_role"].value == "manager":
                check = True
            uid = serializer["uid"].value
            AuthUser.objects.create(id = uid, first_name = first_name, last_name = last_name, is_staff = check, username = user, password = password,email = user)
            return Response(None, status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def create_users(request):
    try:
        users = json.loads(request.body)['users']
        for user in users:
            serializer = UserSerializer(data=user)
            print(user)
            if serializer.is_valid():
                serializer.save()
                password = make_password(serializer["password"].value)
                user = serializer["email"].value
                first_name = serializer["first_name"].value
                last_name = serializer["last_name"].value
                check = False
                if serializer["user_role"].value == "mng" or serializer["user_role"].value == "manager":
                    check = True
                uid = serializer["uid"].value
                AuthUser.objects.create(id = uid, first_name = first_name, last_name = last_name, is_staff = check, username = user, password = password,email = user)
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
            userRef = User.objects.filter(uid=serializer.data['uid'])
            json = JSONRenderer().render(userRef.values())
            stream = io.BytesIO(json)
            data = JSONParser().parse(stream)[0]
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_user_network(request):
    try:
        serializer = UidFormSerializer(data=request.data)
        if serializer.is_valid():
            userRef = User.objects.get(uid=serializer.data['uid'])
            network = User.objects.filter(tid=userRef.tid)
            json = JSONRenderer().render(network.values())
            stream = io.BytesIO(json)
            data = JSONParser().parse(stream)
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='put', 
    manual_parameters=[
        openapi.Parameter(
            name='profile_picture', in_=openapi.IN_FORM,
            type=openapi.TYPE_FILE,
            description="user's profile picture"
        )
    ], 
    responses={
        status.HTTP_422_UNPROCESSABLE_ENTITY: openapi.Response(
            description="If one of the required field is missing or there are conflict/invalid information"
        ),
        status.HTTP_201_CREATED: openapi.Response(
            description="When user created successfully",
        )
    }
)
@api_view(["PUT"])
@parser_classes([MultiPartParser, FileUploadParser])
def update_user_profile_picture(request):
    try:
        if 'profile_picture' not in request.data:
            return Response({"error": "profile picture is empty"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        uid = request.user.id
        userRef = User.objects.get(uid=uid)
        userRef.profile_picture = request.data['profile_picture']
        userRef.save()
        return Response(status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def change_password(request):
    try:
        uid = request.data["uid"]
        old_password = request.data["old"]
        new_pasword = request.data["new"]
        user = User.objects.get(uid = uid)
        if old_password == user.password:
            user.password = new_pasword
            user.save()
            return Response(None,status=status.HTTP_200_OK)
        else:
            return Response(None, status.HTTP_401_UNAUTHORIZED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def personal_information(request):
    try:
        token = request.query_params['token']
        uid = jwt.decode(token, os.environ.get('SECRET_KEY'), os.environ.get('ALGORITHM'))["user_id"]
        if not uid == 1:
            role = User.objects.get(uid = uid).user_role
        else:
            role = "SuperUser"
        Ret = {"uid": uid, "role": role}
        return Response(Ret,status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)  