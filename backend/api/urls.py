from django.urls import path
from django.conf.urls import url
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from . import api

schema_view = get_schema_view(
    openapi.Info(
        title="Whitespace character APIs",
        default_version='v1',
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('dummy_api/', api.dummy_api, name='dummy_api'),
    path('get_users/', api.get_users),
    path('create_user/', api.create_user),
    path('create_users/', api.create_users),
    path('create_vote/', api.create_vote),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]
