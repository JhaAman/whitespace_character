from api.models.Notification import NotificationSerializer

def makeNotification(message, uid):
    notif_data = {
        "notif_uid": uid,
        "notif_message": message
    }
    serializer = NotificationSerializer(data=notif_data)
    if serializer.is_valid():
        serializer.save()