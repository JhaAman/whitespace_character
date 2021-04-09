from django.urls import include, path
from django.conf.urls import url
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

import api.services.user as apiUser
import api.services.recognition as apiRecog
import api.services.profile as apiProfile
import api.services.company as apiComp
import api.services.team as apiTeam
import api.services.notification as apiNotification

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
<<<<<<< HEAD
    # path('dummy_api/', api.dummy_api),
    path('get_user/', apiUser.get_user),
    path('get_users/', apiUser.get_users),
    path('create_user/', apiUser.create_user),
    path('create_users/', apiUser.create_users),
    path('get_user_network/', apiUser.get_user_network),
    path('create_recognition/', apiRecognition.create_recognition),
    path('get_user_recognitions/', apiRecognition.get_user_recognitions),
    path('get_all_recognitions/', apiRecognition.get_all_recognitions),
    path('put_flag_recognition/', apiRecognition.put_flag_recognition),
    path('create_company/', apiCompany.create_company),
    path('create_team/', apiTeam.create_team),
    path('get_notif/', apiNotification.get_notif),
    path('update_notif/', apiNotification.update_notif),
    path('get_profile/', apiProfile.get_profile),
=======

    # services/user endpoints
    path('user/get/', apiUser.get, name='get_user'),
    path('user/all/', apiUser.all, name='get_all_user'),
    path('user/create/', apiUser.create, name='create_user'),
    path('user/create_batch/', apiUser.create_batch, name='create_batch_user'),
    path('user/mng_stats/', apiUser.mng_stats, name='get_mng_stats'),

    # services/recognition endpoints
    path('recog/create/', apiRecog.create, name='create_recognition'),
    path('recog/get_batch/', apiRecog.get_batch, name='get_user_recogntions'),
    path('recog/all/', apiRecog.all, name='get_all_recogntions'),
    path('recog/put_flag/', apiRecog.put_flag, name='put_flag_recogntion'),

    # services/company endpoints
    path('company/create/', apiComp.create, name='create_company'),

    # services/team endpoints
    path('team/create/', apiTeam.create, name='create_team'),

    # services/profile endpoints
    path('get_profile/', apiProfile.get_profile, name='get_profile'),

    # views endpoints
    path('home/posts/', views.HomePageView.as_view(), name='get_home_posts'),
    path('home/mng_digest/', views.ManagerDigestView.as_view(), name='get_mng_digest'),

    # swagger endpoints
>>>>>>> origin/feat/feed
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]