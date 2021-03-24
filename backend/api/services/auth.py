from api.models.User import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import json

@api_view(["POST"])
def log_in(request):
    try:
        user_name = json.loads(request.body)["email"]
        password = json.loads(request.body)["password"]
        users = User.objects.all()
        for user in users:
            print (user)
            if user_name == user.email:
                if password == user.password:
                    return Response(None,status.HTTP_200_OK)
                else:
                    return Response(None,status.HTTP_401_UNAUTHORIZED)

        return Response(None, status.HTTP_401_UNAUTHORIZED)  
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
def log_out(request):
    try:
        return Response(None,status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST) 