from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.models.User import User
from api.models.User import UserSerializer
from django.contrib.auth.models import User as AuthUser
from django.contrib.auth.hashers import make_password
import json


@api_view(["POST"])
def create_user(request):
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            password = make_password(request.data["password"])
            user = serializer["email"].value
            first_name = serializer["first_name"].value
            last_name = serializer["last_name"].value
            check =  serializer["user_role"].value == "mng" or serializer["user_role"].value == "manager":
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
            if serializer.is_valid():
                serializer.save()
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_users(request):
    try:
        qs = User.objects.all()
        serializer = UserSerializer(qs, many=True)
        return Response(serializer.data)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)