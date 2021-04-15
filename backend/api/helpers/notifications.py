from api.db.serializers import \
    NotificationSerializer as NotifSrl


def makeNotification(message, uid, notif_type):
    notif_data = {
        "notif_uid": uid,
        "notif_message": message,
        "notif_type": notif_type
    }
    serializer = NotifSrl(data=notif_data)
    if serializer.is_valid():
        serializer.save()