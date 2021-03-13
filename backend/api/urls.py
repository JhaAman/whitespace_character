from django.urls import path

import api.services.user as api_user
import api.services.vote as api_vote

urlpatterns = [
    # path('dummy_api/', api.dummy_api),
    path('get_users/', api_user.get_users),
    path('create_user/', api_user.create_user),
    path('create_users/', api_user.create_users),
    path('create_vote/', api_vote.create_vote),
]
