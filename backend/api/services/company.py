from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.models.Company import Company
from api.models.Company import CompanySerializer
import json
 
@api_view(["POST"])
def create_company(request):
    try:
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(None, status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
 
@api_view(["GET"])
def get_companies(request):
    try:
        qs = Company.objects.all()
        serializer = CompanySerializer(qs, many=True)
        return Response(serializer.data)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
