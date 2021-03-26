from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.models.User import User
from api.models.User import UserSerializer
import json
 
@api_view(["GET"])
def get_profile(request):
    try:
        profile_data = {}
 
        user_id = json.loads(request.body)['uid']
        user = User.objects.get(pk = user_id)
        serializer = UserSerializer(user)
 
        serialized_data = serializer.data
        serialized_data['network'] = []
 
        network = User.objects.filter(tid = serialized_data['tid'])
        serializer = UserSerializer(network, many=True)
        for user in serializer.data:
            if user['uid'] != user_id:
                serialized_data['network'].append(user)    
                
        return Response(serialized_data)
