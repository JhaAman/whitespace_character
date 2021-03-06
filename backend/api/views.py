import json

from django.core.exceptions import ValidationError

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView

from api.db.models import \
    User, \
    Recognition as Recog
from api.db.serializers import \
    UserSerializer as UserSrl, \
    UidFormSerializer as UidFormSrl, \
    RecognitionSerializer as RecogSrl, \
    HomePostSerializer as HomePostSrl \
    


class HomePageView(generics.ListAPIView):

    serializer_class = HomePostSrl
    pagination_class = PageNumberPagination

    def get_queryset(self):
        recogAllQsList = Recog.objects.all()
        recogAllDictList = RecogSrl(recogAllQsList, many=True).data

        dataset = []

        for recogDict in recogAllDictList:
            userFrom = User.objects.get(uid=recogDict['uid_from']);
            userFromName = userFrom.first_name + " " + userFrom.last_name
            userFromId = userFrom.uid
            userFromImg = None
            userTo = User.objects.get(uid=recogDict['uid_to']);
            userToName = userTo.first_name + " " + userTo.last_name
            userToId = userTo.uid
            userToImg = None
            tags = recogDict['tags']
            comments = recogDict['comments']
            feedDict = {
                'name_from': userFromName,
                'uid_from': userFromId,
                'img_from': userFromImg,
                'name_to': userToName,
                'uid_to': userToId,
                'img_to': userToImg,
                'tags': tags,
                'comments': comments
            }
            dataset.append(feedDict)

        homePostSrl = HomePostSrl(data=dataset, many=True)
        lc = homePostSrl.is_valid(raise_exception=True)
        dataset = homePostSrl.validated_data

        return dataset


    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ManagerDigestView(generics.ListAPIView):

    serializer_class = HomePostSrl
    pagination_class = PageNumberPagination

    def get_queryset(self):
        # Serialize incoming request data
        requestSrl = UidFormSrl(data=self.request.data)
        lc = requestSrl.is_valid(raise_exception=True)
        # Get validated data
        requestDict = requestSrl.validated_data
        # Get manager object
        managerObj = User.objects.get(uid=requestDict['uid'])
        userQsList = User.objects.filter(tid=managerObj.tid)
        userDictList = UserSrl(userQsList, many=True).data
        recogDictListList = list()
        for userDict in userDictList:
            recogObjList = Recog.objects.filter(uid_to=userDict['uid'])
            recogDictList = RecogSrl(recogObjList, many=True).data
            recogDictListList.append(recogDictList)

        dataset = []

        for i in range(len(userDictList)):
            dataset.append({
              'user': userDictList[i],
              'recogs': [recogDict['rid'] for recogDict in recogDictListList[i]]
            })

        #return queryset
        return dataset

    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)