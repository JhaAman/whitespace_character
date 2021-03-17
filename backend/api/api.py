from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.models.User import User
from api.models.Vote import Vote
import json


@api_view(["GET"])
def dummy_api(request):
    try:
        n1 = json.loads(request.body)['n1']
        n2 = json.loads(request.body)['n2']
        return JsonResponse({"sum": n1 + n2})
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def create_user(request):
    try:
        first_name = json.loads(request.body)['first_name']
        last_name = json.loads(request.body)['last_name']
        email = json.loads(request.body)['email']
        password = json.loads(request.body)['password']
        User.objects.create(first_name=first_name, last_name=last_name, email=email, password=password)
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def create_users(request):
    try:
        users = json.loads(request.body)['users']
        for user in users:
            User.objects.create(first_name=user['first_name'], last_name=user['last_name'],email = user['email'])
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def create_vote(request):
    try:
        vote = json.loads(request.body)
        Vote.objects.create(vid=vote['vid'], tags=vote['tags'])
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_users(request):
    try:
        users = User.objects.all()
        to_return = []
        for user in users:
            to_return.append({"first_name": user.First_name, "last_name": user.Last_name})
        return JsonResponse({"all_users": to_return})
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def log_in(request):
    try:
        user_name = json.loads(request.body)["email"]
        password = json.loads(request.body)["password"]
        users = User.objects.all()
        for user in users:
            if user_name == user.email:
                if password == user.password:
                    return Response(None,status.HTTP_200_OK)
                else:
                    return Response(None,status.HTTP_401_UNAUTHORIZED)
        return Response(None, status.HTTP_401_UNAUTHORIZED)  
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)

