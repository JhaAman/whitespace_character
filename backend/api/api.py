from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import json


@api_view(["GET"])
def dummy_api(request):
    try:
        n1 = json.loads(request.body)['n1']
        n2 = json.loads(request.body)['n2']
        return JsonResponse({"sum": n1 + n2})
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
