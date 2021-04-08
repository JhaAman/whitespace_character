import traceback

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import api.db.models
from api.db.serializers import CompanySerializer, ApiReportSerializer


"""Company Endpoints

Org: Team Whitespace Character
Authors: 
    Khai Nguyen, khainguyen@umass.edu
    Myron Lacey, 
    Duy Pham,
    Khang Nguyen, 
Created: April 4th, 2021

API endpoints in service of Company model object
"""


@api_view(["POST"])
def create_company(request):
    try:
        # Serializer incoming request
        companySrl = CompanySerializer(data=request.data)

        # If data fields are valid, save to database and return 
        #   success report
        if companySrl.is_valid():
            companySrl.save()
            return Response(
                data=ApiReportSerializer({
                    'http_status': status.HTTP_200_OK,
                    'msg': "Company object created",
                }).data, 
                status=status.HTTP_201_CREATED)

        # If data fields are invalid, return error report
        return Response(
            data = ApiReportSerializer({
                'http_status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                'msg': "Cannot create Company object: Invalid field",
                'trace': companySrl.errors
            }).data,
            status = status.HTTP_422_UNPROCESSABLE_ENTITY)

    except ValueError as e:
        # If Exception occurs, return error report
        return Response(
            data = ApiReportSerializer({
                'http_status': status.HTTP_400_BAD_REQUEST,
                'msg': "Cannot create Company object: Invalid field",
                'trace': traceback.format_exc()
            }).data,
            status = status.HTTP_400_BAD_REQUEST)