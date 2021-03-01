from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.models import User
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
        user = User(first_name=first_name, last_name=last_name)
        user.save()
        return JsonResponse({"message": "User created!"})
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
