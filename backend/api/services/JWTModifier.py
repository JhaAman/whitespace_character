from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from api.db.models import User 


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['access'] = str(refresh.access_token)
        # Add extra responses here
        uid = str(self.user.id)
        data['uid'] = uid
        if not uid == "1":
            data['role'] = User.objects.get(uid = uid).user_role
        else:
            data['role'] = "SuperUser"
        data['theme'] = User.objects.get(uid = uid).color_theme
        return data
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # ADD CUSTOM FIELD HERE

        token['is_staff'] = user.is_staff
        
        # ...
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer