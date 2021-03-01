from django.urls import path

from . import api

urlpatterns = [
    path('dummy_api/', api.dummy_api),
    path('get_users/', api.get_users),
    path('create_user/', api.create_user),
]
