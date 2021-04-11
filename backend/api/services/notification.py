from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.models.Notification import *
from api.models.ApiSerializers import NidFormSerializer

@api_view(["GET"])
def get_notif(request):
    try:
        # if not 'uid' in request.query_params:
        #     return Response("Missing uid", status.HTTP_400_BAD_REQUEST)
        uid = request.user.id
        qs = Notification.objects.filter(notif_uid=uid)
        serializer = NotificationSerializer(qs, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update_notif(request):
    try:
        serializer = NidFormSerializer(data=request.data)
        if serializer.is_valid():
            notificationRef = Notification.objects.get(nid=serializer.data['nid'])
            notificationRef.seen = True
            notificationRef.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)