from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from api.db.serializers import TeamSerializer


"""Team Endpoints

Org: Team Whitespace Character
Authors: 
    Khai Nguyen, khainguyen@umass.edu
    Myron Lacey, 
    Duy Pham,
    Khang Nguyen, 
Created: April 4th, 2021

API endpoints in service of Team model object
"""


@api_view(["POST"])
def create_team(request):
    try:
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=None, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)