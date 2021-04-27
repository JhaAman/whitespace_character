from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from api.db.models import Recognition
from api.db.serializers import RidFormSerializer, RecognitionSerializer

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

@api_view(["GET"])
def get_reported_recognitions(request):
    try:
        # get the queryset of all recognitions with 3 or more reports
        qs = Recognition.objects.filter(flag_count__gte=3)
        # create serializer for reported recognitions
        serializer = RecognitionSerializer(qs, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def approve_recognitions(request):
    try:
        # create serializer to check if 'rid' in the url parameters is valid
        serializer = RidFormSerializer(data={'rid': request.query_params['rid']})
        if serializer.is_valid():
            # get specified recognition from 'rid' in the url parameters
            recogRef = Recognition.objects.get(rid=request.query_params['rid'])
            # check if the 'ignored' url parameter is 'true'
            check = True if request.query_params['ignored'] == 'true' else False
            # if true, remove the recognition from the list of reported recognitions
            if check:
                recogRef.flag_count = 0
                recogRef.save()
                return Response(None, status=status.HTTP_200_OK)
            # if false, delete the recognition
            else:
                recogRef.delete()
                return Response("Recognition deleted: " + request.query_params['rid'], status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)