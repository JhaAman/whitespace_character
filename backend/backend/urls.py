from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

<<<<<<< HEAD
=======

>>>>>>> origin/feat/feed
from api.services.JWTModifier import (

    MyTokenObtainPairView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/get_token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

