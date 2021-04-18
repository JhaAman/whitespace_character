from api.helpers.notifications import makeNotification
from api.db.models import \
    User as User, \
    Recognition as Recog
from api.db.serializers import \
    RecognitionSerializer as RecogSrl, \
    UserSerializer as UserSrl


def updateBadges(useridto, useridfrom):
    uid_to_received = Recog.objects.filter(uid_to = useridto).count()
    uid_from_sent = Recog.objects.filter(uid_from = useridfrom).count()

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