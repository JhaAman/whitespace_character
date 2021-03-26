from django.contrib import admin
from django.urls import include, path
from api.services.JWTModifier import (

    MyTokenObtainPairView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/get_token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]