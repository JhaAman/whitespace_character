from django.urls import path

from . import api

urlpatterns = [
    path('dummy_api/', api.dummy_api),
]
