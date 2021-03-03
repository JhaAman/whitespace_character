from django.contrib import admin
from django.urls import include, path
from api import api

urlpatterns = [
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls),
    path('dummy_api/', api.dummy_api),
    path('get_users/', api.get_users),
    path('create_user/', api.create_user),
    path('create_users/', api.create_users),
    path('create_vote/', api.create_vote),
]