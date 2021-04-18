import json

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from api.db.models import User
from api.db.serializers import \
    UserSerializer as UserSrl

 
@api_view(["GET"])
def get_profile(request):
    try:
        if not 'uid' in request.query_params:
            return Response("Missing uid", status.HTTP_400_BAD_REQUEST)
        profile_data = {}
        user_id = request.query_params['uid']
        user = User.objects.get(pk = user_id)
        serializer = UserSrl(user)
        serialized_data = serializer.data
        serialized_data['network'] = []
        network = User.objects.filter(tid = serialized_data['tid'])
        serializer = UserSrl(network, many=True)
        for user in serializer.data:
            if user['uid'] != user_id:
                serialized_data['network'].append(user)        
        return Response(serialized_data)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)