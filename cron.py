from api.models.User import User
def my_scheduled_job():
    all_users = User.objects.all()
    for user in all_users:
        user.values_scores = dict().fromkeys(user.values_scores, 0)
        user.save()