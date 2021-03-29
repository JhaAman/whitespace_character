from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.models.Recognition import Recognition
from api.models.Recognition import RecognitionSerializer
from api.helpers.badges import updateBadges
import json

@api_view(["POST"])
def create_vote(request):
    try:
        serializer = RecognitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            updateBadges(request.data['uid_to'], request.data['uid_from'])
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_received_votes(request):
    try:
        user_id = json.loads(request.body)['uid']
        qs = Recognition.objects.all().filter(uid_to=user_id)
        if not qs:
            return Response("User not found", status.HTTP_404_NOT_FOUND)
        serializer = RecognitionSerializer(qs, many=True)
        return Response(serializer.data)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
 
@api_view(["DELETE"])
def delete_vote(request):
    try:
        recognition_id = json.loads(request.body)['rid']
        rec = Recognition.objects.get(pk = recognition_id)
        rec.delete()
        return Response(None, status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
