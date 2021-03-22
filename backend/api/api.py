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


@api_view(["PUT"])
def parsing_values(request):
    try:
        users = User.objects.all()
        values = json.loads(request.body)['values']
        ret = {}
        for value in values:
            ret[value] = 0
        ret = json.dumps(ret)
        for user in users:
            user.values_score = ret
            user.save()
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def create_vote(request):
    try:
        vote = json.loads(request.body)
        current_votes = Vote.objects.all()
        current_emps = User.objects.all()
        uid_from = vote['uid_from']
        uid_to = vote['uid_to']
        tags = vote['tags']
        for curr in current_votes:
            if curr.uid_from == uid_from:
                if curr.uid_to == uid_to:
                    if curr.tags == tags:
                        return Response(None, status.HTTP_405_METHOD_NOT_ALLOWED)
        Vote.objects.create(uid_from = uid_from, uid_to = uid_to, tags=tags)
        for curr in current_emps:
            if curr.uid == uid_to:
                temp = curr.values_score
                temp = json.loads(temp)
                temp[tags] += 1
                curr.values_score = temp
                curr.save()
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_users(request):
    try:
        users = User.objects.all()
        to_return = []
        for user in users:
            to_return.append({"first_name": user.first_name, "last_name": user.last_name})
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

