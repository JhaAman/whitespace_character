from django.urls import path

import api.services.user as apiUser
import api.services.recognition as apiRecognition

urlpatterns = [
    # path('dummy_api/', api.dummy_api),
    path('get_users/', apiUser.get_users),
    path('create_user/', apiUser.create_user),
    path('create_users/', apiUser.create_users),
    path('create_vote/', apiRecognition.create_vote),
]
