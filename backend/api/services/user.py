from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from django.http import JsonResponse

from api.models.User import User
from api.models.User import UserSerializer

import io, json


@api_view(["POST"])
def create_user(request):
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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
        return Response(serializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_users(request):
    try:
        qs = User.objects.all()
        serializer = UserSerializer(qs, many=True)
        return Response(data=erializer.data, status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_user(request):

    class GetUserSerializer(serializers.Serializer):
        uid = serializers.CharField(max_length=8)
        def validate_uid(self, value):
            if not User.objects.filter(uid=value).exists():
                raise serializers.ValidationError("{id} user id does not exist".format(id=value))
            return value

    try:
        serializer = GetUserSerializer(data=request.data)
        if serializer.is_valid():
            userRef = User.objects.filter(uid=serializer.data['uid'])
            json = JSONRenderer().render(userRef.values())
            stream = io.BytesIO(json)
            data = JSONParser().parse(stream)[0]
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)