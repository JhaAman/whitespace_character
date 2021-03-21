from django.urls import path
from django.conf.urls import url
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

import api.services.user as apiUser
import api.services.recognition as apiRecognition
import api.services.profile as apiProfile

schema_view = get_schema_view(
    openapi.Info(
        title="Whitespace character APIs",
        default_version='v1',
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # path('dummy_api/', api.dummy_api),
    path('get_users/', apiUser.get_users),
    path('create_user/', apiUser.create_user),
    path('create_users/', apiUser.create_users),
    path('create_vote/', apiRecognition.create_vote),
    path('get_profile/', apiProfile.get_profile),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]
