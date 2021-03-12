from django.urls import path

from . import api

urlpatterns = [
    path('dummy_api/', api.dummy_api, name='dummy_api'),
    path('get_users/', api.get_users),
    path('create_user/', api.create_user),
    path('create_users/', api.create_users),
    path('create_vote/', api.create_vote),
    path('get_votes/', api.get_votes),
]
