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

import api.views as views


schema_view = get_schema_view(
    openapi.Info(
        title="Whitespace character endpoints",
        default_version='v1',
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [

    # services/user endpoints
    path('get_user/', apiUser.get_user, name='get_user'),
    path('get_users/', apiUser.get_users, name='get_users'),
    path('create_user/', apiUser.create_user, name='create_user'),
    path('create_users/', apiUser.create_users, name='create_users'),

    # services/recognition endpoints
    path('create_recognition/', apiRecognition.create_recognition, name='create_recognition'),
    path('get_user_recognitions/', apiRecognition.get_user_recognitions, name='get_user_recogntions'),
    path('get_all_recognitions/', apiRecognition.get_all_recognitions, name='get_all_recogntions'),
    path('put_flag_recognition/', apiRecognition.put_flag_recognition, name='put_flag_recogntion'),

    # services/company endpoints
    path('create_company/', apiCompany.create_company, name='create_company'),

    # services/team endpoints
    path('create_team/', apiTeam.create_team, name='create_team'),

    # services/profile endpoints
    path('get_profile/', apiProfile.get_profile, name='get_profile'),

    # views/HomePageView endpoints
    path('get_home_posts/', views.HomePageView.as_view(), name='get_home_posts'),

    # swagger endpoints
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]
