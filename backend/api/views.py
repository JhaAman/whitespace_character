import json

from django.core.exceptions import ValidationError

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView

from api.db.models import User, Recognition
from api.db.serializers \
    import UserSerializer, RecognitionSerializer, HomePostSerializer


class HomePageView(generics.ListAPIView):

    serializer_class = HomePostSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        # get all users and their received recognitions
        userObjList = User.objects.all()
        userJsonList = UserSerializer(instance=userObjList, many=True).data
        recogJsonListList = list()
        for userObj in userObjList:
            recogObjList = Recognition.objects.filter(uid_to=userObj.uid)
            recogJsonList = RecognitionSerializer(instance=recogObjList, many=True).data
            recogJsonListList.append(recogJsonList)

        dataset = []

        for i in range(len(userJsonList)):
            dataset.append({
              'user': userJsonList[i],
              'recogs': [ recogJson['rid'] for recogJson in recogJsonListList[i] ]
            })

        #return queryset
        return dataset
