from api.models.User import User
from api.models.User import UserSerializer
from api.models.Recognition import Recognition
from api.models.Recognition import RecognitionSerializer
from api.helpers.notifications import makeNotification

def updateBadges(useridto, useridfrom):
    uid_to_received = Recognition.objects.filter(uid_to = useridto).count()
    uid_from_sent = Recognition.objects.filter(uid_from = useridfrom).count()

    if uid_to_received % 5 == 0:
        userRef = User.objects.get(pk = useridto)
        badgeTitle = str(uid_to_received) + " Recognitions Received"
        userRef.badges.append(badgeTitle)
        userRef.save()
        makeNotification("You received a badge for: " + badgeTitle, useridto, "recognition_badge")

    if uid_from_sent % 5 == 0:
        userRef = User.objects.get(pk = useridfrom)
        badgeTitle = str(uid_from_sent) + " Recognitions Sent"
        userRef.badges.append(badgeTitle)
        userRef.save()
        makeNotification("You received a badge for: " + badgeTitle, useridfrom, "recognition_badge")