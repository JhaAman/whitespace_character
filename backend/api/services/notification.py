from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.db.models import Notification as Notif
from api.db.serializers import \
    NidFormSerializer as NidFormSrl, \
    NotificationSerializer as NotifSrl


#Rather than you have to passed the UID to the param, the backend will read the uid from the token
#How to call it: use it without the params
@api_view(["GET"])
def get_notif(request):
    try:
        token = request.META.get('HTTP_AUTHORIZATION').replace("Bearer ","")
        uid = jwt.decode(token, os.environ.get('SECRET_KEY'), os.environ.get('ALGORITHM'))["user_id"]
        qs = Notif.objects.filter(notif_uid=uid)
        serializer = NotifSrl(qs, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update_notif(request):
    try:
        serializer = NidFormSrl(data=request.data)
        if serializer.is_valid():
            notificationRef = Notif.objects.get(nid=serializer.data['nid'])
            notificationRef.seen = True
            notificationRef.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)