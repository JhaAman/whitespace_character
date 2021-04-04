from api.models.User import User
from api.models.User import UserSerializer
from api.models.Recognition import Recognition
from api.models.Recognition import RecognitionSerializer
from api.helpers.notifications import makeNotification

def updateBadges(useridto, useridfrom):
    uid_to_received = Recognition.objects.filter(uid_to = useridto).count()
    uid_from_sent = Recognition.objects.filter(uid_from = useridfrom).count()

    if uid_to_received % 5 == 0:
        user = User.objects.get(pk = useridto)
        serializer = UserSerializer(user)
        serialized_data = serializer.data
        badgeTitle = str(uid_to_received) + " Recognitions Received"
        serialized_data['badges'].append(badgeTitle)
        serializer = UserSerializer(instance=user, data=serialized_data)
        if serializer.is_valid():
            serializer.save()
            makeNotification("You received a badge for: " + badgeTitle, useridto)

    if uid_from_sent % 5 == 0:
        user = User.objects.get(pk = useridfrom)
        serializer = UserSerializer(user)
        serialized_data = serializer.data
        badgeTitle = str(uid_from_sent) + " Recognitions Sent"
        serialized_data['badges'].append(badgeTitle)
        serializer = UserSerializer(instance=user, data=serialized_data)
        if serializer.is_valid():
            serializer.save()
            makeNotification("You received a badge for: " + badgeTitle, useridfrom)