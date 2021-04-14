from django.urls import include, path
from django.conf.urls import url
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

import api.services.user as apiUser
import api.services.recognition as apiRecognition
import api.services.profile as apiProfile
import api.services.company as apiCompany
import api.services.team as apiTeam
import api.services.notification as apiNotification
import api.services.get_rockstars as apiRockstars

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
    path('get_user/', apiUser.get_user),
    path('get_users/', apiUser.get_users),
    path('personal_information/', apiUser.personal_information),
    path('create_user/', apiUser.create_user),
    path('create_users/', apiUser.create_users),
    path('get_user_network/', apiUser.get_user_network),
    path('update_user_profile_picture/', apiUser.update_user_profile_picture),
    path('create_recognition/', apiRecognition.create_recognition),
    path('get_user_recognitions/', apiRecognition.get_user_recognitions),
    path('get_all_recognitions/', apiRecognition.get_all_recognitions),
    path('put_flag_recognition/', apiRecognition.put_flag_recognition),
    path('create_company/', apiCompany.create_company),
    path('create_team/', apiTeam.create_team),
    path('get_notif/', apiNotification.get_notif),
    path('update_notif/', apiNotification.update_notif),
    path('get_profile/', apiProfile.get_profile),
    path('get_rockstars/',apiRockstars.get_rockstars),
    path('reset/',apiRockstars.reset_count),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]
