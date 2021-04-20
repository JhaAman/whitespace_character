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
import api.services.get_rockstars as apiRockstars
import api.services.search as apiSearch
import api.services.upload as apiUpload


import api.views as views


import api.views as views
import jwt


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
    path('user/create/', apiUser.create, name='create_user'),
    path('user/create_batch/', apiUser.create_batch, name='create_batch_user'),
    path('user/get/', apiUser.get, name='get_user'),
    path('user/all/', apiUser.all, name='get_all_user'),
    path('user/mng/stats/', apiUser.mng_stats, name='get_mng_stats'),
    path('user/uid/',apiUser.personal_information, name='get_personal_info'),

    # services/recognition endpoints
    path('recog/create/', apiRecog.create, name='create_recognition'),
    path('recog/create_batch/', apiRecog.create_batch, name='create_recognition'),
    path('recog/get/user/', apiRecog.get_batch, name='get_user_recogntions'),
    path('recog/all/', apiRecog.all, name='get_all_recogntions'),
    path('recog/put_flag/', apiRecog.put_flag, name='put_flag_recogntion'),

    # services/company endpoints
    path('company/create/', apiComp.create, name='create_company'),

    # services/team endpoints
    path('team/create/', apiTeam.create, name='create_team'),

    # services/notification endpoints
    path('get_notif/', apiNotification.get_notif),
    path('update_notif/', apiNotification.update_notif),

    # services/upload endpoints
    path('upload/create/', apiUpload.create, name='upload_data'),

    # services/search endpoints
    path('search/user/', apiSearch.search_user, name='search'),

    # services/profile endpoints
    path('get_profile/', apiProfile.get_profile, name='get_profile'),

    # profile picture
    path('update_user_profile_picture/', apiUser.update_user_profile_picture),

    # views endpoints
    path('home/posts/', views.HomePageView.as_view(), name='get_home_posts'),
    path('home/mng_digest/', views.ManagerDigestView.as_view(), name='get_mng_digest'),

    # rockstars
    path('get_rockstar/',apiRockstars.get_rockstars),

    # personal information

    path('user/get_perInfo/',apiUser.personal_information),
    path('user/get_Image/',apiUser.get_Image),
    path('user/change_password/',apiUser.change_password),
    path('user/get_name/',apiUser.get_name),


    
    
    # swagger endpoints
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]