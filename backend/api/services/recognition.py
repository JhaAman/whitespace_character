from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from api.models.User import *
from api.models.Recognition import *

import io


@api_view(["POST"])
def create_recognition(request):
    try:
        serializer = RecognitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_user_recognitions(request):

    class GetUserRecognitionSerializer(serializers.Serializer):
        uid = serializers.CharField(max_length=8)
        def validate_uid(self, value):
            if not User.objects.filter(uid=value).exists():
                raise serializers.ValidationError("{id} user id does not exist".format(id=value))
            return value
    
    try:
        serializer = GetUserRecognitionSerializer(data=request.data)
        if serializer.is_valid():
            userRef = User.objects.get(uid=serializer.data['uid'])
            recognitions = Recognition.objects.filter(uid_to=serializer.data['uid'])
            json = JSONRenderer().render(recognitions.values())
            stream = io.BytesIO(json)
            data = JSONParser().parse(stream)
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def put_flag_recognition(request):

    class PutFlagRecognitionSerializer(serializers.Serializer):
        
        rid = serializers.CharField(required=True)

        def validate_rid(self, value):
            if not Recognition.objects.filter(rid=value).exists():
                raise serializers.ValidationError("{id} recognition id does not exist".format(id=value))
            return value

    try:
        serializer = PutFlagRecognitionSerializer(data=request.data)
        if serializer.is_valid():
            recognitionRef = Recognition.objects.get(rid=serializer.data['rid'])
            recognitionRef.flag_count += 1
            recognitionRef.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_all_recognitions(request):
    try:
        recognitions = Recognition.objects.all()
        serializer = RecognitionSerializer(recognitions, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)