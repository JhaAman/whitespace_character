from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.models.User import *
from api.models.ApiSerializers import UidFormSerializer

"""
Accepts JSON of the form:
  {
    "uid": "12345678",
    "badgeTitle": "Your badge title here"
  }
"""
@api_view(["PUT"])
def add_badge(request):
    try:
        serializer = UidFormSerializer(data={"uid": request.data['uid']})
        if serializer.is_valid():
            userRef = User.objects.get(pk = request.data['uid'])
            userRef.badges.append(request.data['badgeTitle'])
            userRef.save()
            return Response(None, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)