from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.db.models import Recognition
from api.db.serializers import RidFormSerializer

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

@api_view(["GET"])
def get_reported_recognitions(request):
    try:
        qs = Recognition.objects.filter(flag_count__gte=3)
        serializer = RecognitionSerializer(qs, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


# @swagger_auto_schema(method='post', request_body=openapi.Schema(
#     type=openapi.TYPE_OBJECT, 
#     properties={
#         'rid': openapi.Schema(type=openapi.TYPE_STRING, description='id of the reported recognition'),
#         'ignored': openapi.Schema(type=openapi.TYPE_BOOLEAN, description="the admin's choice to ignore or report the recognition"),
#     },
#     responses={
#         status.HTTP_404_NOT_FOUND: openapi.Response(
#             description="If the rid passed in is not found"
#         ),
#         status.HTTP_200_OK: openapi.Response(
#             description="When the reported recognition is processed successfully",
#         )
#     }
# ))
@api_view(["GET"])
def approve_recognitions(request):
    try:
        serializer = RidFormSerializer(data={'rid': request.query_params['rid']})
        if serializer.is_valid():
            recogRef = Recognition.objects.get(rid=request.query_params['rid'])
            check = True if request.query_params['ignored'] == 'true' else False
            if check:
                recogRef.flag_count = 0
                recogRef.save()
                return Response(None, status=status.HTTP_200_OK)
            else:
                recogRef.delete()
                return Response("Recognition deleted: " + request.query_params['rid'], status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)