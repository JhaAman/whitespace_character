from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models.Company import CompanySerializer


@api_view(["POST"])
def create_company(request):
    try:
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=None, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)