import io

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from api.db.models import User, Recognition
from api.db.serializers import UidFormSerializer, RidFormSerializer


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
    try:
        serializer = UidFormSerializer(data=request.data)
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
    try:
        serializer = RidFormSerializer(data=request.data)
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