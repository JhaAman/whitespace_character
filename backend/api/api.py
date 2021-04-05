from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


@swagger_auto_schema(
    methods=['get'],
    manual_parameters=[
        openapi.Parameter(
            name='n1', in_=openapi.IN_QUERY,
            type=openapi.TYPE_INTEGER,
            description="first number",
            required=True
        ),
        openapi.Parameter(
            name='n2', in_=openapi.IN_QUERY,
            type=openapi.TYPE_INTEGER,
            description="second number",
            required=True
        ),
    ],
    responses={
        status.HTTP_400_BAD_REQUEST: openapi.Response(
            description="If one of the number is missing or not an integer"
        ),
        status.HTTP_200_OK: openapi.Response(
            description="If 2 number are added successfully",
            examples={
                "application/json": {
                    "sum": 12
                }
            }
        )
    }
)
@api_view(["GET"])
def dummy_api(request):
    try:
        if not 'n1' in request.query_params or not 'n2' in request.query_params:
            return Response("Missing numbers", status.HTTP_400_BAD_REQUEST)
        n1 = int(request.query_params['n1'])
        n2 = int(request.query_params['n2'])
        return JsonResponse({"sum": n1 + n2})
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(e.args[0], status.HTTP_500_INTERNAL_SERVER_ERROR)