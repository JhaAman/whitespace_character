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

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from api.db.serializers \
    import CompanySerializer, ApiResponseSerializer


@api_view(["POST"])
def create_company(request):
    try:
        # Serialize incoming request
        requestSrl = CompanySerializer(data=request.data)

        # If request data fields are valid
        if requestSrl.is_valid():
            # Save object to Company database
            requestSrl.save()
            # Return success report
            return \
                Response(
                    data=
                        ApiResponseSerializer({
                            'status': status.HTTP_200_OK,
                            'msg': "Created Company object"
                        }).data,
                    status=status.HTTP_201_CREATED)

        # If data fields are invalid, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                        'msg': "Cannot create Company object: Invalid field",
                        'trace': requestSrl.errors
                    }).data,
                status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiResponseSerializer({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot create Company object: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)
