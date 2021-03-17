from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.models.User import User
from api.models.Recognition import Recognition
import json


@api_view(["POST"])
def create_vote(request):
    try:
        vote = json.loads(request.body)
        Vote.objects.create(vid=vote['vid'], tags=vote['tags'])
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)