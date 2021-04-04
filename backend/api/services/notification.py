from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.models.Notification import *


@api_view(["GET"])
def get_notif(request):
    try:
        if not 'uid' in request.query_params:
            return Response("Missing uid", status.HTTP_400_BAD_REQUEST)
        qs = Notification.objects.filter(notif_uid=request.query_params['uid'])
        serializer = NotificationSerializer(qs, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)