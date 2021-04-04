from api.models.Notification import NotificationSerializer

def makeNotification(message, uid, notif_type):
    notif_data = {
        "notif_uid": uid,
        "notif_message": message,
        "notif_type": notif_type
    }
    serializer = NotificationSerializer(data=notif_data)
    if serializer.is_valid():
        serializer.save()